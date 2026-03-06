/**
 * Test Lanyard API Connection
 * Run this to verify your Lanyard setup is working
 * 
 * Usage: node test-lanyard.js
 */

const DISCORD_USER_ID = '1369896039858835531';

async function testLanyardAPI() {
  console.log('🧪 Testing Lanyard API Connection...\n');
  
  try {
    console.log('📡 Fetching Discord status...');
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
    );
    
    if (!response.ok) {
      console.error(`❌ API request failed: ${response.status}`);
      return;
    }
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('❌ API returned unsuccessful response');
      return;
    }
    
    console.log('✅ Successfully connected to Lanyard API\n');
    console.log('📊 Current Status:');
    console.log(`   Discord Status: ${data.data.discord_status}`);
    console.log(`   User ID: ${data.data.discord_user.id}`);
    console.log(`   Username: ${data.data.discord_user.username}`);
    
    if (data.data.kv && Object.keys(data.data.kv).length > 0) {
      console.log('\n📦 KV Store Data:');
      for (const [key, value] of Object.entries(data.data.kv)) {
        if (key === 'last_seen') {
          const timestamp = parseInt(value);
          const date = new Date(timestamp);
          const timeAgo = Math.floor((Date.now() - timestamp) / 60000);
          console.log(`   ${key}: ${value}`);
          console.log(`   └─ Date: ${date.toLocaleString()}`);
          console.log(`   └─ Time ago: ${timeAgo} minutes`);
        } else {
          console.log(`   ${key}: ${value}`);
        }
      }
    } else {
      console.log('\n📦 KV Store: Empty (run update-lanyard-status.js to populate)');
    }
    
    if (data.data.activities && data.data.activities.length > 0) {
      console.log('\n🎮 Current Activities:');
      data.data.activities.forEach((activity, i) => {
        console.log(`   ${i + 1}. ${activity.name}`);
      });
    }
    
    console.log('\n✅ Lanyard is working correctly!');
    console.log('\n📝 Next steps:');
    console.log('   1. Get your API key: /api-key in Lanyard Discord');
    console.log('   2. Set environment variable: export LANYARD_API_KEY=your_key');
    console.log('   3. Run monitor: npm run lanyard:monitor');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('   - Check your internet connection');
    console.log('   - Make sure you\'re in the Lanyard Discord server');
    console.log('   - Verify your Discord ID is correct');
  }
}

testLanyardAPI();
