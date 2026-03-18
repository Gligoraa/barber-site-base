import os
import shutil
import json
import argparse
import re

def clone_business(template_path, shop_data_path, destination_path):
    # 1. Duplicate the template (ignoring heavy folders)
    if os.path.exists(destination_path):
        print(f"Error: Destination {destination_path} already exists. Skipping.")
        return
    
    shutil.copytree(template_path, destination_path, ignore=shutil.ignore_patterns('node_modules', '.git', 'dist'))
    print(f"Cloned base template (skipped node_modules/dist) to {destination_path}")

    # 2. Parse new shop data
    with open(shop_data_path, 'r', encoding='utf-8') as f:
        new_data = json.load(f)

    # 3. Read current business-config.ts
    config_file_path = os.path.join(destination_path, 'src', 'config', 'business-config.ts')
    with open(config_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 4. Inject new data into businessData object
    # This uses a simple string replacement for the object literal
    # For more complex scripts, we'd use a real TS parser, but for this template, 
    # we'll target the const businessData: BusinessConfig = { ... }; block.
    
    new_data_str = json.dumps(new_data, indent=2)
    # Convert double quotes to single quotes to match TS style if needed (optional)
    # new_data_str = new_data_str.replace('"', "'")

    # Regex to find the export const businessData: BusinessConfig = { ... };
    # Note: This is a fragile but effective method for this specific template.
    pattern = r'export const businessData: BusinessConfig = \{.*?\};'
    replacement = f'export const businessData: BusinessConfig = {json.dumps(new_data, indent=2)};'
    
    # Use re.DOTALL and re.MULTILINE to match across lines
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(config_file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully injected custom data for '{new_data['name']}'")
    print(f"Project ready in {destination_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Automate barbershop website cloning.')
    parser.add_argument('--template', type=str, default='d:/barbers anti/Website Template', help='Path to base template')
    parser.add_argument('--input', type=str, required=True, help='Path to shop data JSON')
    parser.add_argument('--output_dir', type=str, required=True, help='Path for the new shop project')
    
    args = parser.parse_args()
    clone_business(args.template, args.input, args.output_dir)
