const mysql = require('mysql');
const http = require("http");

const host = 'localhost';
const port = 8000;

// MySQL bağlantısı
var con = mysql.createConnection({
    host: "192.250.229.44",
    user: "mutfakpo_zz",
    password: "zehra.zeynep",
    database: "mutfakpo_trip"
});

// Veritabanına bağlanma
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database!");
});

// Tarihleri formatlama fonksiyonu
function formatDate(dateString) {
    if (dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Yalnızca YYYY-MM-DD kısmını alır
    }
    return dateString;
}

// JSON.stringify sırasında tarihleri formatlamak için replacer fonksiyonu
function replacer(key, value) {
    if (typeof value === 'string' && key.includes('date')) {
        return formatDate(value);
    }
    return value;
}

// HTTP sunucusu oluşturma
const requestListener = function (req, res) {
    // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log(body);
        if (req.url === '/all_users' && req.method === 'GET') {
            const sql = 'SELECT * FROM user;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/insert_user' && req.method === 'POST') {
            const payload = JSON.parse(body)
            const sql = "INSERT INTO `user` (`e-mail`, password, user_name, date) VALUES ('"+payload['e-mail']+"', '"+payload.password+"', '"+payload.user_name+"', now());";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User inserted successfully!' }));
                }
            });
        } 
        else if (req.url === '/user' && req.method === 'POST') {
            const payload = JSON.parse(body);
            const sql = "SELECT id, `e-mail`, password FROM `user` WHERE `e-mail` = ? AND password = ?;";
            con.query(sql, [payload['e-mail'], payload.password], function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else if (result.length > 0) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Login successful!', userId: result[0].id }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid email or password' }));
                }
            });
        } 
        else if (req.url === '/update_user' && req.method === 'PUT') {
            const payload = JSON.parse(body)
            const sql = "UPDATE `user` SET `e-mail` = '"+payload['e-mail']+"', password = '"+payload.password+"', user_name = '"+payload.user_name+"' WHERE id = "+payload.id+";";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User updated successfully!' }));
                }
            });
        } else if (req.url === '/all_places' && req.method === 'GET') {
            const sql = 'SELECT * FROM places;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/insert_place' && req.method === 'POST') {
            const payload = JSON.parse(body)
            const sql = "INSERT INTO places (name, price, description, rating, picture) VALUES ('"+payload.name+"', "+payload.price+", '"+payload.description+"', "+payload.rating+", '"+payload.picture+"');";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Place inserted successfully!' }));
                }
            });
        } else if (req.url === '/update_place' && req.method === 'PUT') {
            const payload = JSON.parse(body)
            const sql = "UPDATE places SET name = '"+payload.name+"', price = "+payload.price+", description = '"+payload.description+"', rating = "+payload.rating+", picture = '"+payload.picture+"' WHERE id = "+payload.id+";";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Place updated successfully!' }));
                }
            });
        } else if (req.url === '/places_ordered_by_rating' && req.method === 'GET') {
            const sql = 'SELECT * FROM places ORDER BY rating DESC;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/recent_places' && req.method === 'GET') {
            const sql = 'SELECT * FROM suggestions ORDER BY date DESC LIMIT 10;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/places_below_35' && req.method === 'GET') {
            const sql = 'SELECT * FROM places WHERE price <= 35;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/places_above_4_rating' && req.method === 'GET') {
            const sql = 'SELECT * FROM places WHERE rating >= 4.0 ORDER BY rating DESC;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/places_for_age_20_30' && req.method === 'GET') {
            const sql = `
                SELECT places.*
                FROM preferences 
                INNER JOIN suggestions ON preferences.user_id = suggestions.user_id 
                INNER JOIN places ON suggestions.place_id = places.id 
                WHERE preferences.age BETWEEN 20 AND 30;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/most_preferred_sport' && req.method === 'GET') {
            const sql = `
                SELECT sport, COUNT(*) as preference_count 
                FROM preferences 
                GROUP BY sport 
                ORDER BY preference_count DESC 
                LIMIT 1;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/all_preferences' && req.method === 'GET') {
            const sql = 'SELECT * FROM preferences;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/insert_preference' && req.method === 'POST') {
            const payload = JSON.parse(body)
            const sql = "INSERT INTO preferences (user_id, age, type, size, sport, budget) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [payload.user_id, payload.age, payload.type, payload.size, payload.sport, payload.budget];
      
            con.query(sql, values, function (err, result) {
              if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Preference inserted successfully!' }));
              }
            });
        } else if (req.url === '/update_preference' && req.method === 'PUT') {
            const payload = JSON.parse(body)
            const sql = "UPDATE preferences SET age = "+payload.age+", type = '"+payload.type+"', size = '"+payload.size+"', sport = '"+payload.sport+"', budget = "+payload.budget+" WHERE id = "+payload.id+";";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Preference updated successfully!' }));
                }
            });
        } else if (req.url === '/all_suggestions' && req.method === 'GET') {
            const sql = 'SELECT * FROM suggestions;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/insert_suggestion' && req.method === 'POST') {
            const payload = JSON.parse(body)
            const sql = "INSERT INTO suggestions (user_id, place_id, date) VALUES ("+payload.user_id+", "+payload.place_id+", now());";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Suggestion inserted successfully!' }));
                }
            });
        } else if (req.url === '/update_suggestion' && req.method === 'PUT') {
            const payload = JSON.parse(body)
            const sql = "UPDATE suggestions SET place_id = "+payload.place_id+", date = now() WHERE id = "+payload.id+";";
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Suggestion updated successfully!' }));
                }
            });
        } else if (req.url === '/user_suggestion_count' && req.method === 'GET') {
            const sql = `
                SELECT user_id, COUNT(*) as suggestion_count 
                FROM suggestions 
                GROUP BY user_id 
                ORDER BY suggestion_count DESC;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/most_suggested_places' && req.method === 'GET') {
            const sql = `
                SELECT places.name, COUNT(*) as suggestion_count 
                FROM suggestions 
                INNER JOIN places ON suggestions.place_id = places.id 
                GROUP BY places.name 
                ORDER BY suggestion_count DESC;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/places_5_to_10' && req.method === 'GET') {
            const sql = 'SELECT * FROM places LIMIT 5 OFFSET 4;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/sum_price_places_above_3_star' && req.method === 'GET') {
            const sql = 'SELECT SUM(price) FROM places WHERE rating >= 3;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/latest_suggestion_per_user' && req.method === 'GET') {
            const sql = `
                SELECT s1.*
                FROM suggestions s1
                INNER JOIN (
                    SELECT user_id, MAX(date) as latest_date
                    FROM suggestions
                    GROUP BY user_id
                ) s2 ON s1.user_id = s2.user_id AND s1.date = s2.latest_date;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/average_price_per_user_suggestion' && req.method === 'GET') {
            const sql = `
                SELECT suggestions.user_id, AVG(places.price) as average_price
                FROM suggestions 
                INNER JOIN places ON suggestions.place_id = places.id 
                GROUP BY suggestions.user_id;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/places_within_budget' && req.method === 'GET') {
            const sql = 'SELECT * FROM places WHERE price BETWEEN 100 AND 300;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/most_suggested_user' && req.method === 'GET') {
            const sql = `
                SELECT user_id, COUNT(*) as suggestion_count 
                FROM suggestions 
                GROUP BY user_id 
                ORDER BY suggestion_count DESC 
                LIMIT 1;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/average_user_age' && req.method === 'GET') {
            const sql = 'SELECT AVG(age) as average_age FROM preferences;';
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        } else if (req.url === '/user_count_per_sport' && req.method === 'GET') {
            const sql = `
                SELECT sport, COUNT(DISTINCT user_id) as user_count 
                FROM preferences 
                GROUP BY sport;
            `;
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result, replacer, 2)); // Tarih formatını düzenlemek için replacer fonksiyonu kullanılır
                }
            });
        }   else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Not Found");
        }   
    });
    };

// Sunucuyu başlatma
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
