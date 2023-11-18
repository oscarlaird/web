# data looks like
"""
0:{11 items
"img_url":string"https://steamcdn-a.akamaihd.net/steam/apps/945360/header.jpg?t=1598556351"
"date":string"Nov 16, 2018"
"developer":string"Innersloth"
"publisher":string"Innersloth"
"full_desc":{2 items
"sort":string"game"
"desc":string"About This Game Play with 4-10 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!Originally created as a party game, we recommend playing with friends at a LAN party or online using voice chat. Enjoy cross-platform play between Android, iOS and PC. Win by completing tasks to prepare the ship or ejecting all Impostors. React quickly to undo the Impostor's sabotages. Check the Admin map and Security cameras to keep tabs on other Crewmates. Report any dead bodies immediately to start discussion of who the suspected Impostor is. Call emergency meetings to discuss suspicious behavior. Vote to eject suspected Impostors. Kill crewmates and frame bystanders. Pretend to run tasks to blend in with the crewmates. Sneak through the vents to quickly move about the ship. Use sabotages to cause chaos and divide the crew. Close doors to trap victims and kill in private.Features Customization: Pick your color and hat. Lots of game options: Add more impostors, more tasks, and so much more! Quickly find a game online from the host list. In-game text chat. Rich discord integration. Cross-platform play between PC, Android, and iOS!"
}
"requirements":{...
}2 items
"popu_tags":[...
]18 items
"price":string"499"
"url_info":{...
}4 items
"name":string"Among Us"
"categories":[...
]6 items
}
1:{11 items
"img_url":string"https://steamcdn-a.akamaihd.net/steam/apps/730/header.jpg?t=1592263625"
"date":string"Aug 21, 2012"
"developer":string"Valve, Hidden Path Entertainment"
"publisher":string"Valve"
"full_desc":{...
}2 items
"requirements":{...
}2 items"""

# parse into sqlite file games.db

import json

import sqlite3

conn = sqlite3.connect('games.db')

c = conn.cursor()

c.execute("""CREATE TABLE games (
            name text,
            img_url text,
            date text,
            developer text,
            full_desc text,
            price text,
            url_info text
            )""")

with open('games.json') as f:
    data = json.load(f)
    for i, game in enumerate(data):
        if i > 10000:
            break
        name = game['name'] if 'name' in game else None
        img_url = game['img_url'] if 'img_url' in game else None
        date = game['date'] if 'date' in game else None
        developer = game['developer'] if 'developer' in game else None
        full_desc = game['full_desc']['desc'] if 'full_desc' in game and 'desc' in game['full_desc'] else None
        price = game['price'] if 'price' in game else None
        url_info = game['url_info']['url'] if 'url_info' in game and 'url' in game['url_info'] else None
        c.execute("INSERT INTO games VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (name, img_url, date, developer, full_desc, price, url_info))

# drop where any field is null
c.execute("DELETE FROM games WHERE name IS NULL OR img_url IS NULL OR date IS NULL OR developer IS NULL OR full_desc IS NULL OR price IS NULL OR url_info IS NULL")
# print count
c.execute("SELECT COUNT(*) FROM games")
print(c.fetchone()[0])

conn.commit()

conn.close()