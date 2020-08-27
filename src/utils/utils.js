// Функция: включить лоадер
export function renderLoading(buttonSave, isLoading) {
    if (isLoading) {
        buttonSave.textContent = 'Сохранение...'
    } 
    else{
        buttonSave.textContent = 'Сохранить'
    }
  }