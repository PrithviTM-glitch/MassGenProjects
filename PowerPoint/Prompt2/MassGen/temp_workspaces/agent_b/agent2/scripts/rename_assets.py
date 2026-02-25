import os
import glob

def rename_assets():
    files = sorted(glob.glob("assets/*.png"))
    for i, file_path in enumerate(files):
        # Extract the sequence number (e.g. _00_, _01_)
        # Filename looks like: 20260224_181710_00_...
        try:
            name = os.path.basename(file_path)
            parts = name.split('_')
            seq = int(parts[2])
            new_path = f"assets/image_{seq}.png"
            os.rename(file_path, new_path)
            print(f"Renamed {file_path} to {new_path}")
        except Exception as e:
            print(f"Error renaming {file_path}: {e}")

if __name__ == "__main__":
    rename_assets()
