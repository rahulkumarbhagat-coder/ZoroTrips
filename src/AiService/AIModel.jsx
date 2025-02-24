import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate travel plan for location : Las Vegas, for 3 days for a couple with a cheap budget, give me a hotel options list with Hotel name, Hotel address, price, hotel image url, geo coordinate, ratings, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for 3 days with each day plan with the best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"trip_details\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotel_options\": [\n    {\n      \"hotel_name\": \"Circus Circus Hotel & Casino\",\n      \"hotel_address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-80 per night (depending on dates and room type)\",\n      \"hotel_image_url\": \"https://media-cdn.tripadvisor.com/media/photo-s/1a/14/01/09/circus-circus-hotel-casino.jpg\",\n       \"geo_coordinates\": {\n          \"latitude\": 36.1446,\n          \"longitude\": -115.1696\n        },\n      \"ratings\": \"3.5/5 (often cited as good for families and budget travelers)\",\n      \"description\": \"A classic Las Vegas hotel with a circus theme, offering affordable rooms and free circus acts. While not the most luxurious, it’s a great option for those on a budget. It has various dining options and an amusement park indoors called the Adventuredome\"\n    },\n    {\n      \"hotel_name\": \"Excalibur Hotel & Casino\",\n      \"hotel_address\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n       \"price\": \"$50-90 per night (depending on dates and room type)\",\n      \"hotel_image_url\": \"https://media-cdn.tripadvisor.com/media/photo-s/1a/70/39/2a/excalibur-hotel-casino.jpg\",\n       \"geo_coordinates\": {\n          \"latitude\": 36.0984,\n          \"longitude\": -115.1740\n        },\n      \"ratings\": \"3.8/5 (known for its medieval theme and value)\",\n      \"description\": \"A castle-themed hotel offering good value on the strip with family-friendly entertainment. It features multiple dining options, a pool, and a casino, with a convenient location at the south end of the Strip.\"\n    },\n        {\n      \"hotel_name\": \"OYO Hotel and Casino Las Vegas\",\n      \"hotel_address\": \"115 E Tropicana Ave, Las Vegas, NV 89109\",\n      \"price\": \"$35-70 per night (depending on dates and room type)\",\n      \"hotel_image_url\": \"https://media-cdn.tripadvisor.com/media/photo-s/1a/d8/e4/97/oyo-hotel-casino-las-vegas.jpg\",\n       \"geo_coordinates\": {\n          \"latitude\": 36.1017,\n          \"longitude\": -115.1684\n        },\n      \"ratings\": \"3.4/5 (budget-friendly option)\",\n     \"description\": \"Formerly the Hooters Hotel, OYO is a no-frills hotel with a basic casino and affordable rates, making it a suitable option for budget-conscious travelers. It’s close to the Strip but offers a lower-cost option.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Exploring the Strip & Free Attractions\",\n      \"best_time_to_visit\": \"Afternoon and Evening\",\n      \"activities\": [\n        {\n          \"place_name\": \"The Fountains of Bellagio\",\n          \"place_details\": \"Spectacular water show set to music. It’s a must-see free attraction on the Las Vegas Strip.\",\n          \"place_image_url\": \"https://media.cntraveler.com/photos/5d0a175070941c739b63003a/16:9/w_2560%2Cc_limit/FountainsBellagio_GettyImages-467569977.jpg\",\n           \"geo_coordinates\": {\n              \"latitude\": 36.1126,\n              \"longitude\": -115.1742\n            },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"Depends on hotel location, but generally within walking distance of other Strip attractions\"\n         },\n        {\n          \"place_name\": \"Bellagio Conservatory & Botanical Gardens\",\n          \"place_details\": \"Indoor garden with seasonal displays. Beautiful and free to walk through.\",\n          \"place_image_url\": \"https://media.cntraveler.com/photos/53da8d0260d5d0a756671d97/master/pass/bellagio-conservatory-vegas-cr-getty.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 36.1128,\n              \"longitude\": -115.1739\n            },\n          \"ticket_pricing\": \"Free\",\n           \"time_to_travel\": \"Within Bellagio Hotel, next to the Fountains.\"\n        },\n        {\n          \"place_name\": \"The LINQ Promenade\",\n           \"place_details\": \"Outdoor shopping, dining, and entertainment area.  Great for walking around and people-watching. See the High Roller Observation Wheel from below (ride ticket cost extra)\",\n          \"place_image_url\": \"https://media.cntraveler.com/photos/5be339a9c1c649681089a6ae/16:9/w_2560%2Cc_limit/LINQ-Promenade-Las-Vegas-GettyImages-843568454.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 36.1178,\n              \"longitude\": -115.1703\n            },\n          \"ticket_pricing\": \"Free to walk around, costs for attractions and dining\",\n          \"time_to_travel\": \"Short walk north of Bellagio.\"\n        },\n         {\n          \"place_name\": \"Fremont Street Experience\",\n          \"place_details\": \"Downtown’s pedestrian mall with a light show canopy and free entertainment. A must-see for an old Vegas feel.\",\n          \"place_image_url\": \"https://media.cntraveler.com/photos/58df8189b8485a5b550366ab/16:9/w_2560%2Cc_limit/fremont-street-las-vegas-GettyImages-636601650.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 36.1703,\n              \"longitude\": -115.1400\n            },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"Take the bus (The Deuce) from the strip for approx 30-40 minutes\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Nature & Free Shows\",\n       \"best_time_to_visit\": \"Morning for Nature, Afternoon for Shows\",\n      \"activities\": [\n         {\n          \"place_name\": \"Seven Magic Mountains\",\n           \"place_details\": \"Colorful rock sculptures located about 20-30 minutes drive from Las Vegas on the way to Los Angeles. Great for unique photos.\",\n          \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/9/93/Seven_Magic_Mountains_Nevada_20180518_112.jpg\",\n             \"geo_coordinates\": {\n               \"latitude\": 35.9622,\n               \"longitude\": -115.2298\n             },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"20-30 minute drive from the strip. Consider ride-sharing, rental car or a tour.\"\n        },\n        {\n          \"place_name\": \"Wildlife Habitat at Flamingo\",\n          \"place_details\": \"A small wildlife sanctuary with flamingos, ducks and turtles set within a lovely garden setting. Good to take break from the heat.\",\n           \"place_image_url\": \"https://media.cntraveler.com/photos/5d0ad691548c0d39148399f2/16:9/w_2560%2Cc_limit/Flamingo-Wildlife-Habitat_GettyImages-921480070.jpg\",\n             \"geo_coordinates\": {\n              \"latitude\": 36.1171,\n              \"longitude\": -115.1715\n            },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"Within the Flamingo hotel, near the center of the Strip\"\n        },\n          {\n          \"place_name\": \"Mirage Volcano\",\n           \"place_details\": \"Free fire and volcano eruption show in front of the Mirage Hotel. Fun to experience a Vegas classic.\",\n          \"place_image_url\": \"https://media.cntraveler.com/photos/5884f5c6f60d6d1f02932f17/16:9/w_2560%2Cc_limit/mirage-volcano-las-vegas-GettyImages-519319300.jpg\",\n             \"geo_coordinates\": {\n              \"latitude\": 36.1211,\n              \"longitude\": -115.1735\n            },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"Walk from Flamingo (towards the North Strip)\"\n        },\n        {\n          \"place_name\": \"Street Performers on the Strip\",\n          \"place_details\": \"Various costumed performers and entertainers along the Strip. Great for free entertainment and photos.\",\n           \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/9/98/Las_Vegas_strip_street_performer.jpg\",\n            \"geo_coordinates\": {\n                \"latitude\": 36.1164,\n              \"longitude\": -115.1728\n             },\n           \"ticket_pricing\": \"Free (tips are appreciated)\",\n          \"time_to_travel\": \"Anywhere along the Strip, primarily in the evenings.\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Cultural Exploration & Souvenir Shopping\",\n       \"best_time_to_visit\": \"Morning for Museums, Afternoon for Shopping\",\n      \"activities\": [\n        {\n          \"place_name\": \"Las Vegas Arts District\",\n           \"place_details\": \"An up-and-coming district with colorful murals, galleries, and shops. Great for a casual stroll and some unique finds.\",\n          \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/ArtsDistrictLV.jpg/1200px-ArtsDistrictLV.jpg\",\n           \"geo_coordinates\": {\n                \"latitude\": 36.1523,\n              \"longitude\": -115.1532\n            },\n          \"ticket_pricing\": \"Free to explore, prices vary for purchases.\",\n          \"time_to_travel\": \"Bus (The Deuce) or a short ride-sharing trip from the Strip.\"\n        },\n        {\n         \"place_name\": \"The Pinball Hall of Fame\",\n         \"place_details\": \"A large collection of pinball machines from all eras. A fun and nostalgic experience. Play for a small cost.\",\n          \"place_image_url\": \"https://media-cdn.tripadvisor.com/media/photo-s/11/9b/c6/2b/photo0jpg.jpg\",\n            \"geo_coordinates\": {\n                 \"latitude\": 36.0840,\n              \"longitude\": -115.1631\n            },\n          \"ticket_pricing\": \"Entrance is free, games cost 25c-1 dollar\",\n          \"time_to_travel\": \"Bus or ride sharing from the Arts District\"\n        },\n         {\n          \"place_name\": \"M&M's World\",\n          \"place_details\": \"A fun and colourful multi-story M&M-themed store. Free to look around and can get personalized M&M candies (costs extra).\",\n           \"place_image_url\": \"https://media.cntraveler.com/photos/5d0a19a7548c0d3914839aa9/16:9/w_2560%2Cc_limit/mms-world-las-vegas-GettyImages-530683202.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 36.1074,\n              \"longitude\": -115.1702\n            },\n          \"ticket_pricing\": \"Free to enter and look around, costs apply to any purchases\",\n         \"time_to_travel\": \"Short Walk from the South of the strip\"\n         },\n         {\n          \"place_name\": \"Souvenir Shopping at ABC Stores or local shops\",\n           \"place_details\": \"Pick up some affordable Las Vegas souvenirs at the ABC stores or find locally run souvenir shops off the main Strip area. ABC is a chain that offers everyday items at cheap prices.\",\n            \"place_image_url\": \"https://media.cnn.com/api/v1/images/stellar/prod/180125111354-abc-stores-0124.jpg?c=original\",\n               \"geo_coordinates\": {\n                \"latitude\": 36.1165,\n                 \"longitude\": -115.1715\n              },\n          \"ticket_pricing\": \"Cost depends on what you buy\",\n          \"time_to_travel\": \"Walk along any point of the strip.\"\n         }\n      ]\n    }\n  }\n}\n```\n**Notes:**\n\n*   **Hotel Prices:** These are estimates and can vary significantly based on the season, day of the week, and booking time. Check for deals and book in advance.\n*   **Transportation:** For cheap transportation, use the Deuce bus on the Strip ($6 for a 2-hour pass). Walking is also a great option for getting around the central Strip. Ride-sharing is also viable but will add up costs.\n*   **Food:** Take advantage of budget-friendly meals. There are several fast food and cheap eats options along the strip. You can also pack some snacks to minimize expenses on food.\n*   **Free Activities:** Las Vegas has many free attractions. Be sure to check the schedule of fountain shows, volcano shows, etc.\n*   **Flexibility:** Be flexible with your itinerary as you may want to adjust based on weather conditions or your interests.\n\nThis itinerary should allow you to enjoy the best of Las Vegas while sticking to a budget. Remember to book accommodations in advance for the best prices and to enjoy some of the free events and sights.\n"},
          ],
        },
      ],
    });
  