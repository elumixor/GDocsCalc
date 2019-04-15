### Google Docs Calculator

Revenue = Fixed(WorkerType) + Motivation(Goal, Completion) + Meetings(WorkerType) 

custom input / from tables

### Main Flow
1. Select worker type (Sales/Junior)
2. Input goal completion
3. Google authorization
4. Calculate
    1. Get date
    2. Determine month cell in goal table
    3. Get goals count

# Todo
- [x] BA
  - [x] Project description, goals
  - [x] What data from where
- [x] Application with custom input
  - [x] App setup w/ electron
  - [ ] Setup unit testing
  - [x] XD Design
  - [x] Implementation
    - [x] Functionality
    - [x] Design and animation
    - [ ] Test
- [ ] Add automatic table data retrieval
  - [x] GDocs Api
  - [ ] Naive workflow
    - [x] Login + redirection
    - [x] Get sheets data
      - [ ] Determine date -\> correct table cells
      - [ ] Get to calculator 
    - [x] Save tokens to file
    - [x] Save spreadsheets locations to file
    - [ ] Handle wrong spreadsheets locations
    - [ ] Handle tokens expiration
- [ ] ...
