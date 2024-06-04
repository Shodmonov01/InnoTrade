// data.js
export const data = {
  'В производстве': [
    { id: 'N245-1', needed: 10, produced: 5 },
    { id: 'N123-2', needed: 3, produced: 1 },
    { id: 'N123', needed: 3, produced: 3 },
    { id: 'Алена-Мишка', needed: 3, produced: 4 },
    { id: 'Анастасия Единорог', needed: 3, produced: 3 },
  ],
  'Склад сортировки': [
    { id: 'N245-1', notSorted: 0, movingToStorage: 400, storageLocation: "A-10-12" },
    { id: 'N123-2', notSorted: 200, movingToStorage: 100, storageLocation: "A-10-12" },
    { id: 'N123', notSorted: 300, movingToStorage: 0, storageLocation: "A-10-12" },
    { id: 'Алена-Мишка', notSorted: 150, movingToStorage: 150, storageLocation: "A-10-12" },
    { id: 'Анастасия Единорог', notSorted: 300, movingToStorage: 300, storageLocation: "A-10-12" },
  ],
  'Склад ГП': [
    // ваши данные для склада ГП
  ],
  'Инвентаризация': [
    // ваши данные для инвентаризации
  ],
};
