/**
 * Lanyard Status Updater
 * This script monitors your Discord status and updates Lanyard KV store
 * with your last online timestamp when you go offline.
 * 
 * Setup:
 * 1. Get your Lanyard API key from Discord: /api-key in Lanyard server
 * 2. Set LANYARD_API_KEY environment variable
 * 3. Run: node update-lanyard-status.js
 */

const DISCORD_USER_ID = '1369896039858835531';
const LANYARD_API_KEY = process.env.LANYARD_API_KEY;

if (!LANYARD_API_KEY) {
  console.error('❌ Error: LANYARD_API_KEY environment variable not set');
  console.log('Get your API key from Lanyard Discord server using /api-key command');
  process.exit(1);
}

let lastStatus = null;
let lastOnlineTime = Date.now();

async function fetchDiscordStatus() {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
    );
    const data = await response.json();
    
    if (data.success) {
      return data.data.discord_status;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch status:', error.message);
    return null;
  }
}

async function updateLanyardKV(key, value) {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}/kv/${key}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': LANYARD_API_KEY,
          'Content-Type': 'text/plain'
        },
        body: value.toString()
      }
    );
    
    if (response.ok) {
      console.log(`✅ Updated ${key} = ${value}`);
      return true;
    } else {
      const text = await response.text();
      console.error(`❌ Failed to update KV: ${response.status} - ${text}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating KV:', error.message);
    return false;
  }
}

async function monitorStatus() {
  const currentStatus = await fetchDiscordStatus();
  
  if (!currentStatus) {
    return;
  }
  
  // If status changed
  if (currentStatus !== lastStatus) {
    console.log(`📊 Status changed: ${lastStatus || 'unknown'} → ${currentStatus}`);
    
    // If user is now online/idle/dnd, update last online time
    if (currentStatus === 'online' || currentStatus === 'idle' || currentStatus === 'dnd') {
      lastOnlineTime = Date.now();
      console.log(`🟢 User is active, storing timestamp: ${lastOnlineTime}`);
    }
    
    // If user just went offline, save the last online time to Lanyard KV
    if (currentStatus === 'offline' && lastStatus !== 'offline' && lastStatus !== null) {
      console.log(`⚫ User went offline, updating Lanyard KV...`);
      await updateLanyardKV('last_seen', lastOnlineTime);
    }
    
    lastStatus = currentStatus;
  }
}

// Initial status check
console.log('🚀 Starting Lanyard Status Monitor...');
console.log(`👤 Monitoring user: ${DISCORD_USER_ID}`);
console.log('⏱️  Checking every 10 seconds...\n');

monitorStatus();

// Check every 10 seconds
setInterval(monitorStatus, 10000);
