# **Interactive Quiz Platform**  

## 🚀 About This Project  
Welcome to the **Interactive Quiz Platform!** This web app lets users take quizzes, get instant feedback, and track their progress. It has two levels:  

1️⃣ **Level 1:** Multiple-choice questions (MCQs)  
2️⃣ **Level 2:** Integer-based questions  

Users start with Level 1 and **automatically move to Level 2** before seeing their final score. All quiz attempts are stored using **IndexedDB**, so users can review their history anytime.  

---

## 📂 Project Structure  

```
📦 interactive-quiz-platform
├── 📂 app
│   ├── 📂 components
│   │   ├── Quiz.tsx        # The main quiz logic
│   │   ├── QuizHistory.tsx # Displays past quiz attempts
│   ├── 📂 utils
│   │   ├── quizStorage.ts  # IndexedDB helper functions
│   ├── page.tsx            # Landing page
|   |── globals.css         # Styles
│   ├── layout.tsx          # App layout
├── 📄 README.md            # You're reading this file!
├── 📄 package.json         # Dependencies
├── 📄 tsconfig.json        # TypeScript config
├── 📄 tailwind.config.ts   # Tailwind config
├── 📄 postcss.config.mjs   # Postcss config
├── 📄 next.config.js       # Next.js config
└── 📄 .eslintrc.json       # ESLint rules
```

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js (TypeScript), TailwindCSS  
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)  
- **Database:** IndexedDB (for storing quiz history)  

---

## 🎯 Features  

✔ **Two quiz levels** (MCQs + Integer-based questions)  
✔ **30-second timer per question** ⏳  
✔ **Automatic transition from Level 1 → Level 2**  
✔ **Final scoreboard at the end** 🎉  
✔ **Quiz history stored in IndexedDB** 💾  

---

## 📥 Getting Started  

### 1️⃣ Clone the Project  
```bash
git clone https://github.com/veer-kalpit/interactive-quiz-platform.git
cd interactive-quiz-platform
```

### 2️⃣ Install Dependencies  
```bash
npm install  # or yarn install
```

### 3️⃣ Run the App  
```bash
npm run dev  # or yarn dev
```

### 4️⃣ Open in Your Browser  
Visit [http://localhost:3000](http://localhost:3000)  

---

## 📝 How It Works  

1. Start the quiz and answer **Level 1 (MCQs)**.  
2. Once Level 1 is completed, **Level 2 (integer-type questions) starts automatically**.  
3. At the end, your **final score** is displayed.  
4. Your past quiz attempts are saved in **Quiz History**.  

---

## 💾 Quiz History (Stored in IndexedDB)  

Every quiz attempt is saved with:  
- **Quiz name** (e.g., "Complete Quiz - Level 1 + 2")  
- **Score** (out of 10)  
- **Timestamp** (date & time of attempt)  

This lets users track progress over time!  

---

## 🌐 Live Demo  
Check out the live version here: [Interactive Quiz Platform](https://interactive-quiz-dacoid-digital-assignment.vercel.app/)  

---

### 🚀 Have fun quizzing! 🎉

