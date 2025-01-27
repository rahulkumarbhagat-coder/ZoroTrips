export const SelectTravelList =[
    {
        id:1,
        title: 'Just me',
        desc: 'A sole tarveles in exploration',
        icon: '🤷‍♂️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A couple',
        desc: 'Two traveles in tandem',
        icon: '💑',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adventurers',
        icon: '👩‍👧‍👦',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill seekers',
        icon: '✨',
        people:'5 to 10 People'
    }
    
]

export const SelectBudgetOption = [
    {
        id:1,
        title: 'Pocket Friendly',
        desc: 'Stay consious of cost',
        icon: '💵'
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'No worry of cost',
        icon: '💸'
    }
]

export const AI_PROMPT = 'Generate travel plan for location : {location}, for {totalDays} days for {traveller} with a {budget} budget, give me a hotel options list with Hotel name, Hotel address, price, hotel image url, geo coordinate, ratings, descriptions and suggest itinerary(in arrays not objects) with place name, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} days with each day plan with the best time to visit in JSON format'