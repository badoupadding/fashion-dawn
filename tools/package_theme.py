import pathlib
import zipfile

root = pathlib.Path(__file__).resolve().parents[1]
output = root / 'dist'
output.mkdir(exist_ok=True)
destination = output / 'fashion-dawn.zip'
with zipfile.ZipFile(destination, 'w', zipfile.ZIP_DEFLATED) as archive:
    for directory in ('assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'):
        for path in sorted((root / directory).rglob('*')):
            if path.is_file():
                archive.write(path, path.relative_to(root))
print(destination)
