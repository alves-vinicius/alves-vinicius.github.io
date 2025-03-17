# File: scripts/fetch_bus_data.py
import json
import requests
import os
from datetime import datetime
import hashlib

# Constants
TARGET_ROUTES = ['8082', '8083', '8084', '8085', '8012', '8022']
API_ENDPOINT = 'https://api.sptrans.com.br/v2.1/Posicao'
API_TOKEN = os.environ.get('API_TOKEN')

def main():
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    
    # Authenticate with SPTrans API
    auth_url = 'https://api.sptrans.com.br/v2.1/Login/Autenticar'
    auth_response = requests.post(auth_url, params={'token': API_TOKEN})
    
    if not auth_response.json():
        print("Authentication failed")
        exit(1)
        
    # Use the authenticated session
    session = requests.Session()
    session.cookies = auth_response.cookies
    
    # Fetch bus positions
    response = session.get(API_ENDPOINT)
    
    if response.status_code != 200:
        print(f"API request failed with status {response.status_code}")
        exit(1)
        
    data = response.json()
    
    # Filter for specified routes
    if 'vs' in data:
        filtered_data = [bus for bus in data['vs'] if bus.get('p') in TARGET_ROUTES]
    else:
        print("Unexpected data format")
        exit(1)
        
    # Generate timestamp
    current_time = datetime.now()
    timestamp = current_time.strftime('%Y-%m-%d %H:%M:%S')
    
    # Create result object
    result_data = {
        'timestamp': timestamp,
        'buses': filtered_data,
        'server_updated': current_time.isoformat()
    }
    
    # Save to file
    with open('data/latest_bus_data.json', 'w') as f:
        json.dump(result_data, f, indent=2)
        
    # Create a hash of the API token for client-side authentication
    hash_object = hashlib.md5((API_TOKEN + current_time.strftime('%Y-%m-%d')).encode())
    token_hash = hash_object.hexdigest()
    
    # Create a proxy config file for client-side use (without exposing the actual token)
    proxy_config = {
        'auth_endpoint': 'https://api.sptrans.com.br/v2.1/Login/Autenticar',
        'data_endpoint': 'https://api.sptrans.com.br/v2.1/Posicao',
        'token_hash': token_hash,
        'validity': current_time.strftime('%Y-%m-%d'),
        'target_routes': TARGET_ROUTES
    }
    
    with open('data/api_config.json', 'w') as f:
        json.dump(proxy_config, f, indent=2)
    
    print(f"Successfully processed {len(filtered_data)} bus entries")
    
    # Also create a timestamp file to show when server last updated
    with open('data/last_update.json', 'w') as f:
        json.dump({
            'last_server_update': current_time.isoformat(),
            'timestamp': timestamp
        }, f, indent=2)

if __name__ == "__main__":
    main()
