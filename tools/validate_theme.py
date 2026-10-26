import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
errors = []


def load(path):
    try:
        source = re.sub(r'\A\s*/\*.*?\*/\s*', '', path.read_text(), count=1, flags=re.S)
        return json.loads(source)
    except (OSError, ValueError) as error:
        errors.append(f'{path.relative_to(ROOT)}: {error}')
        return {}


def validate_settings(values, schema, location):
    definitions = {item['id']: item for item in schema if 'id' in item}
    for key, value in values.items():
        definition = definitions.get(key)
        if definition is None:
            errors.append(f'{location}: unknown setting {key}')
            continue
        if isinstance(value, str) and '{{' in value:
            continue
        kind = definition['type']
        if kind in ('select', 'radio'):
            allowed = [option['value'] for option in definition['options']]
            if value not in allowed:
                errors.append(f'{location}.{key}: {value!r} is not one of {allowed}')
        if kind == 'range':
            if not isinstance(value, (int, float)) or isinstance(value, bool):
                errors.append(f'{location}.{key}: expected number')
            elif not definition['min'] <= value <= definition['max']:
                errors.append(f'{location}.{key}: outside range')
            elif abs((value - definition['min']) / definition['step'] - round((value - definition['min']) / definition['step'])) > 0.00001:
                errors.append(f'{location}.{key}: does not match step')
        if kind == 'checkbox' and not isinstance(value, bool):
            errors.append(f'{location}.{key}: expected boolean')


sections = {}
for path in (ROOT / 'sections').glob('*.liquid'):
    schemas = re.findall(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', path.read_text(), re.S)
    if len(schemas) == 0:
        sections[path.stem] = {}
        continue
    if len(schemas) != 1:
        errors.append(f'{path.name}: expected one section schema')
        continue
    try:
        sections[path.stem] = json.loads(schemas[0])
    except ValueError as error:
        errors.append(f'{path.name}: {error}')


def validate_template(data, location):
    section_data = data.get('sections', {})
    order = data.get('order', [])
    if len(set(order)) != len(order) or set(order) != set(section_data):
        errors.append(f'{location}: order must reference every section exactly once')
    if len(section_data) > 25:
        errors.append(f'{location}: too many sections')
    for section_id, section in section_data.items():
        kind = section['type']
        schema = sections.get(kind)
        position = f'{location}.{section_id}'
        if schema is None:
            errors.append(f'{position}: missing section {kind}')
            continue
        validate_settings(section.get('settings', {}), schema.get('settings', []), position)
        block_data = section.get('blocks', {})
        block_order = section.get('block_order', [])
        if len(set(block_order)) != len(block_order) or set(block_order) != set(block_data):
            errors.append(f'{position}: block_order must reference every block exactly once')
        if len(block_data) > schema.get('max_blocks', 50):
            errors.append(f'{position}: too many blocks')
        definitions = {block['type']: block for block in schema.get('blocks', [])}
        for block_id, block in block_data.items():
            definition = definitions.get(block['type'])
            if definition is None:
                errors.append(f'{position}.{block_id}: unknown block type {block["type"]}')
            else:
                validate_settings(block.get('settings', {}), definition.get('settings', []), f'{position}.{block_id}')


for directory in ('templates', 'sections'):
    for path in (ROOT / directory).rglob('*.json'):
        validate_template(load(path), str(path.relative_to(ROOT)))

global_schema = load(ROOT / 'config/settings_schema.json')
global_settings = [setting for group in global_schema for setting in group.get('settings', [])]
settings_data = load(ROOT / 'config/settings_data.json')
for name, preset in settings_data.get('presets', {}).items():
    validate_settings({key: value for key, value in preset.items() if key not in ('sections', 'content_for_index', 'blocks')}, global_settings, f'preset.{name}')
    if 'sections' in preset:
        validate_template({'sections': preset['sections'], 'order': list(preset['sections'])}, f'preset.{name}.sections')
if isinstance(settings_data.get('current'), dict):
    current = settings_data['current']
    validate_settings({key: value for key, value in current.items() if key not in ('sections', 'content_for_index', 'blocks')}, global_settings, 'current')
    if 'sections' in current:
        validate_template({'sections': current['sections'], 'order': list(current['sections'])}, 'current.sections')

for path in (ROOT / 'locales').glob('*.json'):
    load(path)

if errors:
    print('\n'.join(errors), file=sys.stderr)
    sys.exit(1)
print(f'Theme structure valid: {len(sections)} section schemas, templates and presets checked.')
