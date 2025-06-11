export interface Plant {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  care: {
    water: string;
    light: string;
    humidity: string;
    temperature: string;
    fertilizer: string;
    pruning?: string;
    propagation?: string;
    notes?: string;
    difficulty?: string;
  };
  tips: string[];
  commonIssues: {
    issue: string;
    cause: string;
    solution: string;
  }[];
  quote?: string;
}

export const plantsData: Plant[] = [
  {
    "id": "1",
    "name": "Rosemary",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Rosemary.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "Regularly",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Rosemary to brighten your day!"
  },
  {
    "id": "2",
    "name": "Lavender",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Lavender.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Low",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After flowering",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Lavender to brighten your day!"
  },
  {
    "id": "3",
    "name": "Sage",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Sage.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Low",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After flowering",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Sage to brighten your day!"
  },
  {
    "id": "4",
    "name": "Thyme",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Thyme.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Low",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After flowering",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Thyme to brighten your day!"
  },
  {
    "id": "5",
    "name": "Oregano",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Oregano.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Low",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After flowering",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Oregano to brighten your day!"
  },
  {
    "id": "6",
    "name": "Basil",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Basil.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Basil to brighten your day!"
  },
  {
    "id": "7",
    "name": "Mint",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Mint.",
    "care": {
      "water": "Regular",
      "light": "Partial shade",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Mint to brighten your day!"
  },
  {
    "id": "8",
    "name": "Parsley",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Parsley.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Parsley to brighten your day!"
  },
  {
    "id": "9",
    "name": "Dill",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Dill.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Dill to brighten your day!"
  },
  {
    "id": "10",
    "name": "Chives",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Chives.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "Regularly",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Chives to brighten your day!"
  },
  {
    "id": "11",
    "name": "Peppers",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Peppers.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Regularly",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Peppers to brighten your day!"
  },
  {
    "id": "12",
    "name": "Tomatoes",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Tomatoes.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Tomatoes to brighten your day!"
  },
  {
    "id": "13",
    "name": "Cucumbers",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cucumbers.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cucumbers to brighten your day!"
  },
  {
    "id": "14",
    "name": "Zucchini",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Zucchini.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Zucchini to brighten your day!"
  },
  {
    "id": "15",
    "name": "Squash",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Squash.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Squash to brighten your day!"
  },
  {
    "id": "16",
    "name": "Beans",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Beans.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Beans to brighten your day!"
  },
  {
    "id": "17",
    "name": "Peas",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Peas.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Peas to brighten your day!"
  },
  {
    "id": "18",
    "name": "Strawberries",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Strawberries.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Runners",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Strawberries to brighten your day!"
  },
  {
    "id": "19",
    "name": "Blueberries",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Blueberries.",
    "care": {
      "water": "Regular",
      "light": "Partial shade",
      "humidity": "Acidic",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Blueberries to brighten your day!"
  },
  {
    "id": "20",
    "name": "Raspberries",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Raspberries.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Raspberries to brighten your day!"
  },
  {
    "id": "21",
    "name": "Blackberries",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Blackberries.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Blackberries to brighten your day!"
  },
  {
    "id": "22",
    "name": "Apples",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Apples.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Apples to brighten your day!"
  },
  {
    "id": "23",
    "name": "Pears",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Pears.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Pears to brighten your day!"
  },
  {
    "id": "24",
    "name": "Cherries",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cherries.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cherries to brighten your day!"
  },
  {
    "id": "25",
    "name": "Peaches",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Peaches.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Peaches to brighten your day!"
  },
  {
    "id": "26",
    "name": "Nectarines",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Nectarines.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Nectarines to brighten your day!"
  },
  {
    "id": "27",
    "name": "Plums",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Plums.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Plums to brighten your day!"
  },
  {
    "id": "28",
    "name": "Apricots",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Apricots.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After flowering",
      "notes": "Grafting",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Apricots to brighten your day!"
  },
  {
    "id": "29",
    "name": "Figs",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Figs.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After fruiting",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Figs to brighten your day!"
  },
  {
    "id": "30",
    "name": "Grapes",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Grapes.",
    "care": {
      "water": "Regular",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Grapes to brighten your day!"
  },
  {
    "id": "31",
    "name": "Avocado",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Avocado.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Avocado to brighten your day!"
  },
  {
    "id": "32",
    "name": "Citrus",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Citrus.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Citrus to brighten your day!"
  },
  {
    "id": "33",
    "name": "Mango",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Mango.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Mango to brighten your day!"
  },
  {
    "id": "34",
    "name": "Pineapple",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Pineapple.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Crown",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Pineapple to brighten your day!"
  },
  {
    "id": "35",
    "name": "Papaya",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Papaya.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Papaya to brighten your day!"
  },
  {
    "id": "36",
    "name": "Bananas",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Bananas.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Suckers",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Bananas to brighten your day!"
  },
  {
    "id": "37",
    "name": "Coffee",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Coffee.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Coffee to brighten your day!"
  },
  {
    "id": "38",
    "name": "Tea",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Tea.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "After fruiting",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Tea to brighten your day!"
  },
  {
    "id": "39",
    "name": "Cactus",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cactus.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Low",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After flowering",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cactus to brighten your day!"
  },
  {
    "id": "40",
    "name": "Succulents",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Succulents.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Well-drained",
      "temperature": "Low",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "After flowering",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Succulents to brighten your day!"
  },
  {
    "id": "41",
    "name": "Orchids",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Orchids.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Bark-based",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "High",
      "propagation": "After flowering",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Orchids to brighten your day!"
  },
  {
    "id": "42",
    "name": "Ferns",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Ferns.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade",
      "humidity": "Moist",
      "temperature": "Balanced",
      "fertilizer": "Cool",
      "pruning": "High",
      "propagation": "After flowering",
      "notes": "Spores",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Ferns to brighten your day!"
  },
  {
    "id": "43",
    "name": "Houseplants",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Houseplants.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Regularly",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Houseplants to brighten your day!"
  },
  {
    "id": "44",
    "name": "Begonia",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Begonia.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Begonia to brighten your day!"
  },
  {
    "id": "45",
    "name": "African Violet",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about African Violet.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Leaf cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful African Violet to brighten your day!"
  },
  {
    "id": "46",
    "name": "Pothos",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Pothos.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Pothos to brighten your day!"
  },
  {
    "id": "47",
    "name": "Snake Plant",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Snake Plant.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Snake Plant to brighten your day!"
  },
  {
    "id": "48",
    "name": "Spider Plant",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Spider Plant.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Puppies",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Spider Plant to brighten your day!"
  },
  {
    "id": "49",
    "name": "ZZ Plant",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about ZZ Plant.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Low",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful ZZ Plant to brighten your day!"
  },
  {
    "id": "50",
    "name": "Peace Lily",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Peace Lily.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Peace Lily to brighten your day!"
  },
  {
    "id": "51",
    "name": "Monstera",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Monstera.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Monstera to brighten your day!"
  },
  {
    "id": "52",
    "name": "Fiddle Leaf Fig",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Fiddle Leaf Fig.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Fiddle Leaf Fig to brighten your day!"
  },
  {
    "id": "53",
    "name": "Calathea",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Calathea.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "High",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Calathea to brighten your day!"
  },
  {
    "id": "54",
    "name": "Maranta",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Maranta.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "High",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Maranta to brighten your day!"
  },
  {
    "id": "55",
    "name": "Philodendron",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Philodendron.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Philodendron to brighten your day!"
  },
  {
    "id": "56",
    "name": "Dieffenbachia",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Dieffenbachia.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Dieffenbachia to brighten your day!"
  },
  {
    "id": "57",
    "name": "Croton",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Croton.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Croton to brighten your day!"
  },
  {
    "id": "58",
    "name": "Dracaena",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Dracaena.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Dracaena to brighten your day!"
  },
  {
    "id": "59",
    "name": "Yucca",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Yucca.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Well-drained",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Yucca to brighten your day!"
  },
  {
    "id": "60",
    "name": "Alocasia",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Alocasia.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "High",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Alocasia to brighten your day!"
  },
  {
    "id": "61",
    "name": "Anthurium",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Anthurium.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "High",
      "propagation": "Pinch back",
      "notes": "Division",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Anthurium to brighten your day!"
  },
  {
    "id": "62",
    "name": "Bromeliad",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Bromeliad.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "High",
      "propagation": "Pinch back",
      "notes": "Pups",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Bromeliad to brighten your day!"
  },
  {
    "id": "63",
    "name": "Hoya",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Hoya.",
    "care": {
      "water": "Moderate",
      "light": "Bright indirect light",
      "humidity": "Potting mix",
      "temperature": "Balanced",
      "fertilizer": "Warm",
      "pruning": "Moderate",
      "propagation": "Pinch back",
      "notes": "Cuttings",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Hoya to brighten your day!"
  },
  {
    "id": "64",
    "name": "Strawberry",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Strawberry.",
    "care": {
      "water": "Regularly",
      "light": "Full sun to partial shade",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "60-85°F",
      "pruning": "Moderate",
      "propagation": "Remove runners and old leaves",
      "notes": "Early summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Strawberry to brighten your day!"
  },
  {
    "id": "65",
    "name": "Tomato",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Tomato.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune suckers and leaves",
      "notes": "Late summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Tomato to brighten your day!"
  },
  {
    "id": "66",
    "name": "Lettuce",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Lettuce.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade to full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest outer leaves as needed",
      "notes": "Spring to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Lettuce to brighten your day!"
  },
  {
    "id": "67",
    "name": "Basil",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Basil.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Pinch off flower buds",
      "notes": "Summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Basil to brighten your day!"
  },
  {
    "id": "68",
    "name": "Mint",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Mint.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade to full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Cut stems back after flowering",
      "notes": "Summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Mint to brighten your day!"
  },
  {
    "id": "69",
    "name": "Cucumber",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cucumber.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Pinch off side shoots and leaves",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cucumber to brighten your day!"
  },
  {
    "id": "70",
    "name": "Bell pepper",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Bell pepper.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune off suckers and leaves",
      "notes": "Summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Bell pepper to brighten your day!"
  },
  {
    "id": "71",
    "name": "Green beans",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Green beans.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Pinch off tips to encourage branching",
      "notes": "Summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Green beans to brighten your day!"
  },
  {
    "id": "72",
    "name": "Zucchini",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Zucchini.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Pinch off side shoots and leaves",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Zucchini to brighten your day!"
  },
  {
    "id": "73",
    "name": "Spinach",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Spinach.",
    "care": {
      "water": "Regularly",
      "light": "Partial shade to full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest outer leaves as needed",
      "notes": "Spring to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Spinach to brighten your day!"
  },
  {
    "id": "74",
    "name": "Kale",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Kale.",
    "care": {
      "water": "Regularly",
      "light": "Full sun to partial shade",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest outer leaves as needed",
      "notes": "Fall to spring",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Kale to brighten your day!"
  },
  {
    "id": "75",
    "name": "Broccoli",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Broccoli.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Remove side shoots",
      "notes": "Spring to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Broccoli to brighten your day!"
  },
  {
    "id": "76",
    "name": "Cauliflower",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cauliflower.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Remove side shoots",
      "notes": "Spring to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cauliflower to brighten your day!"
  },
  {
    "id": "77",
    "name": "Radish",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Radish.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest when radishes are firm",
      "notes": "Spring to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Radish to brighten your day!"
  },
  {
    "id": "78",
    "name": "Carrot",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Carrot.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Thin seedlings",
      "notes": "Spring to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Carrot to brighten your day!"
  },
  {
    "id": "79",
    "name": "Onion",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Onion.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest bulbs when they are firm",
      "notes": "Summer to fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Onion to brighten your day!"
  },
  {
    "id": "80",
    "name": "Garlic",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Garlic.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest bulbs when leaves turn brown",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Garlic to brighten your day!"
  },
  {
    "id": "81",
    "name": "Potato",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Potato.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Hilling up soil around plants",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Potato to brighten your day!"
  },
  {
    "id": "82",
    "name": "Asparagus",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Asparagus.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Harvest spears in spring",
      "notes": "Spring",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Asparagus to brighten your day!"
  },
  {
    "id": "83",
    "name": "Blueberry",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Blueberry.",
    "care": {
      "water": "Regularly",
      "light": "Full sun to partial shade",
      "humidity": "Acidic fertilizer",
      "temperature": "Acidic soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Prune after fruiting",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Blueberry to brighten your day!"
  },
  {
    "id": "84",
    "name": "Raspberry",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Raspberry.",
    "care": {
      "water": "Regularly",
      "light": "Full sun to partial shade",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Prune after fruiting",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Raspberry to brighten your day!"
  },
  {
    "id": "85",
    "name": "Blackberry",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Blackberry.",
    "care": {
      "water": "Regularly",
      "light": "Full sun to partial shade",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Prune after fruiting",
      "notes": "Summer",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Blackberry to brighten your day!"
  },
  {
    "id": "86",
    "name": "Grape",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Grape.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "55-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Grape to brighten your day!"
  },
  {
    "id": "87",
    "name": "Apple",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Apple.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Apple to brighten your day!"
  },
  {
    "id": "88",
    "name": "Pear",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Pear.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Pear to brighten your day!"
  },
  {
    "id": "89",
    "name": "Cherry",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cherry.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cherry to brighten your day!"
  },
  {
    "id": "90",
    "name": "Peach",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Peach.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Peach to brighten your day!"
  },
  {
    "id": "91",
    "name": "Plum",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Plum.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Plum to brighten your day!"
  },
  {
    "id": "92",
    "name": "Avocado",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Avocado.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune after fruiting",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Avocado to brighten your day!"
  },
  {
    "id": "93",
    "name": "Mango",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Mango.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "75-90°F",
      "pruning": "High",
      "propagation": "Prune after fruiting",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Mango to brighten your day!"
  },
  {
    "id": "94",
    "name": "Pineapple",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Pineapple.",
    "care": {
      "water": "Moderate",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "75-90°F",
      "pruning": "High",
      "propagation": "Prune after fruiting",
      "notes": "Crown",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Pineapple to brighten your day!"
  },
  {
    "id": "95",
    "name": "Papaya",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Papaya.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "75-90°F",
      "pruning": "High",
      "propagation": "Prune after fruiting",
      "notes": "Seeds",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Papaya to brighten your day!"
  },
  {
    "id": "96",
    "name": "Lemon",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Lemon.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Winter",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Lemon to brighten your day!"
  },
  {
    "id": "97",
    "name": "Orange",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Orange.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Winter",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Orange to brighten your day!"
  },
  {
    "id": "98",
    "name": "Lime",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Lime.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Winter",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Lime to brighten your day!"
  },
  {
    "id": "99",
    "name": "Grapefruit",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Grapefruit.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Winter",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Grapefruit to brighten your day!"
  },
  {
    "id": "100",
    "name": "Fig",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Fig.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "65-85°F",
      "pruning": "Moderate",
      "propagation": "Prune after fruiting",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Fig to brighten your day!"
  },
  {
    "id": "101",
    "name": "Cherry",
    "category": "Garden Plant",
    "image": "https://via.placeholder.com/150",
    "description": "Information about Cherry.",
    "care": {
      "water": "Regularly",
      "light": "Full sun",
      "humidity": "Balanced fertilizer",
      "temperature": "Well-drained soil",
      "fertilizer": "40-75°F",
      "pruning": "Moderate",
      "propagation": "Prune in winter",
      "notes": "Fall",
      "difficulty": "Moderate"
    },
    "tips": [
      "No specific tips available.",
      "Check for general care instructions for this type of plant."
    ],
    "commonIssues": [],
    "quote": "A beautiful Cherry to brighten your day!"
  }
];