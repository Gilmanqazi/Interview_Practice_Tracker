export const CATEGORIES = [
"DSA",
"Git",
"Technical"
]

export const DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard"
]

export const STATUSES = [
  "Pending", 
  "In Progress", 
  "Completed"
]

export const INITIAL_QUESTIONS = [
  {
    id:"1",
    title:"Two Sum",
    category:"DSA" ,
    difficulty:"Easy",
    status:"Completed",
    createdAt: new Date().toISOString()
  },

  {
    id: "2",
    title: "Git Rebase vs Merge",
    category: "Git",
    difficulty: "Medium",
    status: "In Progress",
    createdAt: new Date().toISOString()
  },

  {
    id: "3",
    title: "Browser Rendering Pipeline",
    category: "Technical",
    difficulty: "Hard",
    status: "Pending",
    createdAt: new Date().toISOString()
  },
]