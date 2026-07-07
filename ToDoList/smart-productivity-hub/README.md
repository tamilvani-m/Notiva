# Smart Productivity Hub

A portfolio-quality React productivity app inspired by Notion, Microsoft To Do, Google Keep, and TickTick.

## Run the Project

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Current Status

Phase 1 is complete:

- Vite React project created
- React Router configured
- Professional app layout created
- Responsive sidebar and top navigation added
- Dark and light mode added with local storage persistence
- Empty/foundation pages created for Dashboard, Tasks, Notes, Reminders, Calendar, Analytics, and Settings
- Reusable starter components added

## Folder Structure

```text
src/
  components/
    Calendar/
    DashboardCards/
    Modal/
    Navbar/
    NoteCard/
    ReminderCard/
    SearchBar/
    Sidebar/
    TaskCard/
    ThemeToggle/
    VoiceInput/
  context/
  hooks/
  pages/
    Analytics/
    Calendar/
    Dashboard/
    Notes/
    Reminders/
    Settings/
    Tasks/
  utils/
```

## Development Roadmap

1. Dashboard
   - Replace mock data with shared app state.
   - Show real counts for today's tasks, completed tasks, pending tasks, notes, reminders, and streak.

2. Task Manager
   - Add task form.
   - Add edit, delete, complete, priority, due date, due time, category, color labels, repeat, favorite, pin, subtasks, and progress.
   - Add drag-and-drop sorting with a library such as `@dnd-kit`.

3. Notes
   - Add create, edit, delete, pin, favorite, categories, and search.
   - Add rich text or image attachments later if needed.

4. Reminders
   - Add date/time picker.
   - Add browser notifications, repeat reminders, snooze, and completed status.

5. Calendar
   - Build a full monthly calendar.
   - Click a day to view tasks and reminders.
   - Highlight overdue and today items.

6. Search
   - Search tasks, notes, reminders, and categories instantly as the user types.

7. Voice Assistant
   - Use browser speech recognition where supported.
   - Convert commands like "Add assignment tomorrow at 8 PM" into task data.

8. Offline Storage
   - Save tasks, notes, reminders, settings, and theme preference in Local Storage.
   - Upgrade to IndexedDB when attachments or larger data become important.

9. Analytics
   - Calculate completed today, pending tasks, weekly progress, monthly progress, productivity streak, total notes, and total reminders.

10. Settings and Polish
    - Add notification preferences, export/import, delete all data, app theme settings, animations, confirmation dialogs, toast notifications, keyboard shortcuts, responsive checks, and accessibility improvements.

## Next Best Step

Build a central data layer in `context/AppDataContext.jsx` with local storage support. After that, connect Dashboard and Tasks to the same task data so the app starts behaving like a real product.
