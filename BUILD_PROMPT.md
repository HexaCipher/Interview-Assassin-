# Full Project Build Prompt - Interview Assassin

## Project Overview

Build a complete interview preparation web application called "Interview Assassin" - an AI-powered adaptive interview simulator that helps users practice technical interviews across multiple roles without using any external APIs.

## Core Requirements

### Functional Requirements
1. **Landing Page**: Allow users to select from 9 technical roles and 3 difficulty levels (Easy, Medium, Hard)
2. **Interview Session**: Present 3 questions sequentially, collect user answers, and provide detailed evaluation
3. **Evaluation System**: Use keyword-based scoring algorithm (NO external APIs) to assess answer quality
4. **Progress Tracking**: Show progress, track scores, and display summary at the end
5. **Question Management**: Prevent duplicate questions within the same interview session

### Technical Roles to Support
- Frontend Developer
- Backend Developer
- Full Stack Developer
- Data Scientist
- Machine Learning Engineer
- DevOps Engineer
- Cybersecurity Analyst
- Product Manager
- System Design

### Difficulty Levels
- **Easy**: Entry-level questions (lenient scoring: 60%+ = Excellent)
- **Medium**: Mid-level questions (balanced scoring: 70%+ = Excellent)
- **Hard**: Senior-level questions (strict scoring: 85%+ = Excellent)

## Technology Stack

**Framework & Libraries:**
- Next.js 16.1 (App Router architecture)
- React 19.2
- Tailwind CSS 4
- shadcn/ui components (Button, Card, Badge, Progress, Textarea, Skeleton)
- JavaScript (ES6+)

**NO External Dependencies:**
- No OpenAI, Gemini, or any LLM API
- No authentication system needed
- No database (use in-memory data structures)

## Project Structure

```
interview-assassin/
├── app/
│   ├── page.jsx                    # Landing page (role/difficulty selection)
│   ├── layout.jsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── api/
│   │   ├── generate-question/
│   │   │   └── route.js           # Question generation API
│   │   └── evaluate-answer/
│   │       └── route.js           # Answer evaluation API
│   └── interview/
│       └── page.jsx               # Interview interface
├── components/
│   ├── EvaluationCard.jsx         # Display evaluation results
│   ├── SummaryCard.jsx            # Display final summary
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── questions.js               # Question database
│   ├── evaluator.js               # Evaluation engine
│   └── utils.ts                   # Utility functions
├── package.json
└── next.config.ts
```

## Implementation Instructions

### Step 1: Question Database (`lib/questions.js`)

Create a comprehensive question database with 8-9 questions per role. Each question should include:

**Question Structure:**
```javascript
{
  id: "unique-id",
  text: "The interview question",
  keyConcepts: ["array", "of", "keywords", "to", "check"],
  idealAnswer: "3-5 sentence model answer",
  category: "Topic category"
}
```

**Required Functions:**
- `getQuestionsForRole(role, count)` - Returns random questions for a role
- `getQuestionById(questionId)` - Retrieves specific question
- `getAllQuestionsForRole(role)` - Returns all questions for a role

**Sample Questions Per Role (create 8-9 each):**

**Frontend Developer:**
- Props vs State in React
- Virtual DOM and performance
- CSS specificity
- JavaScript closures
- Async/await vs Promises
- Box model and box-sizing
- React hooks (useState, useEffect)
- Event delegation

**Backend Developer:**
- SQL vs NoSQL databases
- RESTful API design
- Database indexing
- Middleware in web apps
- Authentication vs Authorization
- Microservices architecture
- Caching strategies
- CORS

**Full Stack Developer:**
- Request-response cycle
- SSR vs CSR
- State management
- JWT authentication
- Performance optimization
- Real-time chat architecture
- Horizontal vs vertical scaling

**Data Scientist:**
- Bias-variance tradeoff
- Supervised vs unsupervised learning
- Handling missing data
- Precision, recall, F1-score
- Regularization (L1/L2)
- Bagging vs boosting
- Cross-validation
- Feature engineering

**Machine Learning Engineer:**
- Model deployment to production
- Model drift detection
- Online vs batch inference
- Class imbalance handling
- Transfer learning
- Gradient descent variants
- A/B testing for ML models
- Embeddings

**DevOps Engineer:**
- CI/CD pipeline stages
- Docker vs virtualization
- Monitoring and troubleshooting
- Infrastructure as Code
- Kubernetes
- Blue-green vs canary deployment
- Reverse proxy vs load balancer
- DevSecOps security

**Cybersecurity Analyst:**
- CIA triad
- Symmetric vs asymmetric encryption
- OWASP Top 10 vulnerabilities
- DDoS attack mitigation
- Zero-day vulnerabilities
- Multi-factor authentication
- Security auditing
- Least privilege principle

**Product Manager:**
- Feature prioritization frameworks
- User research methods
- Success metrics and KPIs
- Product vision vs strategy
- Handling engineering disagreements
- Product roadmap creation
- Requirements definition
- Product-market fit

**System Design:**
- URL shortening service design
- Distributed cache system
- CAP theorem
- Notification system design
- Rate limiter design
- Database sharding
- WebSocket scaling
- Eventual consistency

### Step 2: Evaluation Engine (`lib/evaluator.js`)

Create a sophisticated keyword-based evaluation system WITHOUT external APIs.

**Core Algorithm:**

```javascript
// Scoring Weights
- Key Concept Coverage: 40%
- Answer Depth: 40%
- Technical Terminology: 20%

// Difficulty Adjustments
Easy:   rawScore / 8.5  (more lenient)
Medium: rawScore / 10   (balanced)
Hard:   rawScore / 11   (stricter)

// Final Score: 1-10 scale
```

**Required Functions:**

1. **`calculateConceptCoverage(answer, keyConcepts)`**
   - Check how many key concepts are mentioned (case-insensitive)
   - Return coverage percentage and mentioned concepts list

2. **`calculateDepth(answer)`**
   - Analyze word count (30, 50, 70, 100+ words for scoring tiers)
   - Count sentences (structure variety)
   - Detect examples: "for example", "such as", "e.g."
   - Detect comparisons: "versus", "compared to", "difference"
   - Detect lists: "first", "second", "additionally"
   - Return depth score (0-80 points)

3. **`detectTechnicalTerms(answer)`**
   - Find acronyms (uppercase 2+ letters)
   - Find function calls (word followed by `()`)
   - Find programming keywords (async, await, const, function, etc.)
   - Find technical terms (database, server, algorithm, etc.)
   - Return technical term count (max 20 points)

4. **`getVerdict(score)`**
   - 9-10: "Excellent"
   - 7-8: "Good"
   - 5-6: "Average"
   - 3-4: "Needs Work"
   - 1-2: "Poor"

5. **`generateStrengths(analysis)`**
   - Generate 2 strength statements based on:
     - High concept coverage (60%+)
     - Good depth (50+ points)
     - Technical terminology usage (10+ terms)
     - Answer length (80+ words)

6. **`generateImprovements(analysis, difficulty)`**
   - Generate 3 improvement suggestions based on:
     - Missing key concepts
     - Low depth score
     - Lack of technical terms
     - Difficulty-specific expectations
     - Missing structure/examples

7. **`evaluateAnswer(question, answer, difficulty)`**
   - Main function returning full evaluation object:
   ```javascript
   {
     score: 1-10,
     verdict: "Excellent" | "Good" | "Average" | "Needs Work" | "Poor",
     technical_accuracy: "2-3 sentence assessment",
     clarity: "2-3 sentence assessment",
     depth: "2-3 sentence assessment",
     strengths: ["strength 1", "strength 2"],
     improvements: ["improvement 1", "improvement 2", "improvement 3"],
     ideal_answer: "model answer from question database"
   }
   ```

**Key Implementation Details:**
- Handle answers shorter than 10 words with special low-score response
- Use case-insensitive matching for keywords
- Generate dynamic feedback (not templated)
- Consider difficulty when generating feedback
- Provide constructive, specific suggestions

### Step 3: API Routes

**`app/api/generate-question/route.js`**

```javascript
// POST endpoint
// Input: { role, difficulty, excludeIds: [] }
// Output: { question: "text", questionId: "id" }

Logic:
1. Validate role and difficulty are provided
2. Get questions for the role using getQuestionsForRole()
3. Filter out questions in excludeIds array
4. If no questions available, reset and use all questions
5. Randomly select one question
6. Return question text and ID
```

**`app/api/evaluate-answer/route.js`**

```javascript
// POST endpoint
// Input: { questionId, answer, difficulty }
// Output: { evaluation: {...} }

Logic:
1. Validate questionId and answer are provided
2. Check answer length (minimum 10 characters)
3. Get question object using getQuestionById()
4. Call evaluateAnswer() with question, answer, and difficulty
5. Return evaluation object
```

### Step 4: Landing Page (`app/page.jsx`)

**UI Components:**
- Header with app name "Interview Assassin" (with "Assassin" in brand color)
- Subtitle: "AI-powered adaptive interview practice"

**Role Selection Grid:**
- 9 role cards in 3-column grid (responsive)
- Each card shows icon emoji and role label
- Cards highlight on hover and when selected (border-brand + bg-brand/5)
- Icons:
  - Frontend: 🎨
  - Backend: ⚙️
  - Full Stack: 🚀
  - Data Science: 📊
  - ML Engineer: 🤖
  - DevOps: ☁️
  - Cybersecurity: 🔒
  - Product Manager: 📋
  - System Design: 🏗️

**Difficulty Selection:**
- 3 cards in row (responsive)
- Easy: "Entry-level questions"
- Medium: "Mid-level questions"
- Hard: "Senior-level questions"
- Show checkmark on selected

**Start Button:**
- Large, prominent button
- Disabled until both role and difficulty selected
- Navigates to `/interview?role={role}&difficulty={difficulty}`

**Footer:**
- "Answer 3 adaptive questions • Get detailed feedback • Improve your skills"

### Step 5: Interview Page (`app/interview/page.jsx`)

**State Management:**
```javascript
States needed:
- phase: "loading" | "answering" | "evaluating" | "reviewed" | "summary"
- currentQ: 0-2 (question index)
- question: current question text
- questionId: current question ID
- answer: user's typed answer
- evaluation: evaluation result object
- scores: array of scores [7, 8, 6]
- askedQuestionIds: array of asked question IDs
- error: error message string
```

**Phase Flow:**

1. **Loading Phase:**
   - Show skeleton loaders
   - Fetch question from API with excludeIds
   - Store questionId and add to askedQuestionIds
   - Transition to "answering"

2. **Answering Phase:**
   - Display question text
   - Show textarea for answer (8 rows, font-mono)
   - Display word count below textarea
   - Show "Submit Answer →" button
   - Validate answer length >= 10 words
   - On submit: transition to "evaluating"

3. **Evaluating Phase:**
   - Show "Evaluating..." button state
   - Call evaluate-answer API
   - Store evaluation and score
   - Transition to "reviewed"

4. **Reviewed Phase:**
   - Show collapsible user answer (details/summary)
   - Display EvaluationCard with full evaluation
   - Show "Next Question →" or "View Summary →" button
   - On next: increment currentQ or go to summary

5. **Summary Phase:**
   - Display SummaryCard with all scores
   - Calculate average score
   - Show performance verdict
   - "Start New Interview" button returns to home

**UI Layout:**
- Max width 760px, centered
- Header bar: back button, role/difficulty label, question counter
- Progress bar (updated after each question)
- Question block with badge and styled text
- Answer section (changes based on phase)
- Error messages in red

### Step 6: Evaluation Card Component (`components/EvaluationCard.jsx`)

**Props:** `{ evaluation }`

**Display:**
- Score badge (large, colored by verdict)
- Verdict label (Excellent/Good/Average/Needs Work/Poor)
- Three assessment sections:
  - **Technical Accuracy**: paragraph
  - **Clarity**: paragraph
  - **Depth**: paragraph
- **Strengths** section: bulleted list with ✓ icons
- **Areas for Improvement**: bulleted list with • icons
- **Ideal Answer**: collapsible section showing model answer

**Styling:**
- Card with padding and border
- Section dividers
- Color-coded badges (green for high scores, yellow for medium, red for low)
- Monospace font for labels

### Step 7: Summary Card Component (`components/SummaryCard.jsx`)

**Props:** `{ scores, onRestart }`

**Display:**
- "Interview Complete" header
- Overall performance section:
  - Average score calculation
  - Performance verdict based on average
  - Visual score display (could be simple list or chart)
- Individual question scores: Q1: 7/10, Q2: 8/10, Q3: 6/10
- Performance insights based on score distribution
- "Start New Interview" button calling onRestart

**Score Verdict:**
- 8.5-10: "Outstanding Performance"
- 7-8.5: "Strong Performance"
- 5-7: "Good Effort"
- 3-5: "Needs Improvement"
- 0-3: "Keep Practicing"

### Step 8: Root Layout (`app/layout.jsx`)

```javascript
- Import Geist Mono font from next/font/google
- Set metadata: title "Interview Assassin", description
- HTML with font variable
- Body with bg-background, text-foreground, antialiased
- Simple, clean layout
```

### Step 9: Global Styles (`app/globals.css`)

**Required CSS Variables:**
```css
@theme inline {
  --color-brand: #0A5C47;  // Teal/green brand color
  --color-brand-light: #E8F5F0;
  --color-brand-muted: #3D9B7A;
}

:root {
  --background: oklch(0.97 0.01 85);  // Warm off-white
  --foreground: oklch(0.15 0.01 60);
  --border: oklch(0.90 0.01 75);
  --muted-foreground: oklch(0.45 0.01 60);
  // ... standard shadcn variables
}

// Utility classes
.fade-up {
  animation: fadeUp 0.45s ease forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Step 10: Package Configuration

**`package.json` dependencies:**
```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.575.0",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.5.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## Key Implementation Guidelines

### 1. No External APIs
- All question generation is from local database
- All evaluation is keyword-based algorithm
- No API keys needed
- No environment variables for AI services

### 2. Question Quality
- Each question should be realistic and commonly asked
- Key concepts should be 8-12 terms that MUST appear in good answers
- Ideal answers should be 3-5 sentences, comprehensive
- Cover range of topics within each role

### 3. Evaluation Quality
- Algorithm should be fair and consistent
- Provide specific, actionable feedback
- Strengths should be genuine (not generic praise)
- Improvements should reference actual gaps
- Difficulty adjustment should be noticeable

### 4. User Experience
- Clean, distraction-free interface
- Clear progress indication
- No jarring transitions
- Responsive design
- Helpful error messages

### 5. Code Quality
- Use modern JavaScript (ES6+)
- Proper error handling
- Clear variable names
- Modular functions
- Comments for complex logic

## Testing Checklist

After implementation, test:

1. ✅ Home page loads with all 9 roles and 3 difficulties
2. ✅ Can select role and difficulty, start interview
3. ✅ Interview shows 3 different questions (no duplicates)
4. ✅ Can type answer and see word count update
5. ✅ Short answers (< 10 words) show validation error
6. ✅ Submit shows evaluation with score, verdict, assessments
7. ✅ Evaluation includes 2 strengths and 3 improvements
8. ✅ Can view ideal answer
9. ✅ Progress bar updates correctly
10. ✅ Summary shows all 3 scores and average
11. ✅ Different difficulties affect scoring (test same answer on easy/hard)
12. ✅ Can restart interview and return to home
13. ✅ No console errors
14. ✅ Responsive on mobile devices

## Success Criteria

The project is complete when:
- All 9 roles have 8-9 quality questions each
- Evaluation algorithm provides meaningful, varied feedback
- User can complete full interview flow without errors
- Interface is clean, professional, and responsive
- No external API dependencies
- Code is well-organized and maintainable

## Expected Outcomes

- **Question Database**: 70+ curated technical interview questions
- **Evaluation Engine**: Sophisticated keyword-based scoring (40% concepts + 40% depth + 20% technical terms)
- **Full Application**: Working Next.js app with complete interview flow
- **Zero External Costs**: No API usage, fully self-contained
- **Fast Performance**: <50ms evaluation time, instant question selection
- **Rich Feedback**: 7-metric evaluation with actionable insights

---

## Quick Start Command

After receiving this prompt, implement in this order:
1. Create Next.js project structure
2. Build question database with all 70+ questions
3. Build evaluation engine with scoring algorithm
4. Create API routes
5. Build landing page
6. Build interview page with state management
7. Create evaluation and summary cards
8. Add global styles and polish UI
9. Test complete flow
10. Create PROJECT_SUMMARY.md documenting the build

This is a complete, production-ready interview preparation platform built entirely without external API dependencies.
