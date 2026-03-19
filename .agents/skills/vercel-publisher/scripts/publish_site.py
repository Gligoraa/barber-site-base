import os
import subprocess
import argparse
import sys

def publish_site(commit_message):
    print(f"🚀 Initializing Vercel Publisher for Barbershop Ecosystem...")

    # 1. Change to the root project directory
    project_root = "d:/barbers anti"
    os.chdir(project_root)

    try:
        # 2. Status Check
        status = subprocess.run(['git', 'status', '--short'], capture_output=True, text=True, check=True)
        if not status.stdout.strip():
            print("✨ Everything is up to date. No changes to publish!")
            return

        print(f"📍 Staging local changes and clones...")
        
        # 3. Git Add
        subprocess.run(['git', 'add', '.'], check=True)

        # 4. Git Commit
        print(f"📝 Creating release commit: '{commit_message}'")
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)

        # 5. Git Push
        print(f"📡 Pushing to GitHub (origin main)...")
        subprocess.run(['git', 'push', 'origin', 'main'], check=True)

        print("\n" + "="*50)
        print("✅ SUCCESS: Changes pushed to GitHub!")
        print("🌍 ACTION: Vercel is now automatically rebuilding your site.")
        print("🔗 LIVE: https://barber-site-base.vercel.app/")
        print("="*50)

    except subprocess.CalledProcessError as e:
        print(f"\n❌ ERROR: Git operation failed.")
        print(f"Output: {e.output if hasattr(e, 'output') else 'None'}")
        print(f"Stderr: {e.stderr if hasattr(e, 'stderr') else 'None'}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ ERROR: An unexpected error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Automated Vercel Publisher via GitHub CD.')
    parser.add_argument('--msg', type=str, default='🚀 Automated Update: New Site Changes & Components', help='Descriptive commit message')
    
    args = parser.parse_args()
    publish_site(args.msg)
