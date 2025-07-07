const mealsContainer = document.getElementById('mealsContainer');
const mealTypes = document.getElementById('mealTypes');

mealTypes.addEventListener('click', (e) => {
  e.preventDefault();
  const mealType = e.target.getAttribute('data-meal');
  if (mealType) {
    fetchMeals(mealType);
  }
});

async function fetchMeals(mealType) {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${mealType}`);
    const data = await res.json();
    loadMeals(data.data.recipes);
  } catch (err) {
    alert('No Meals Found');
  }
}

function loadMeals(meals) {
  mealsContainer.innerHTML = '';
  meals.forEach((meal) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
      <div class="card h-100">
        <img src="${meal.image_url}" class="card-img-top" alt="${meal.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${meal.title}</h5>
          <div class="mt-auto d-flex justify-content-between">
            <button class="btn btn-danger btn-sm source-btn" data-id="${meal.id}">Source</button>
            <button class="btn btn-warning btn-sm details-btn" 
              data-title="${meal.title}" 
              data-img="${meal.image_url}" 
              data-publisher="${meal.publisher}">
              Details
            </button>
          </div>
        </div>
      </div>
    `;
    mealsContainer.appendChild(card);
  });

  document.querySelectorAll('.source-btn').forEach(btn => {
    btn.addEventListener('click', async function () {
      const id = this.getAttribute('data-id');
      try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        const sourceUrl = data.data.recipe.source_url;
        window.open(sourceUrl, '_blank');
      } catch (err) {
        alert('No Source Found');
      }
    });
  });

  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const title = this.getAttribute('data-title');
      const img = this.getAttribute('data-img');
      const publisher = this.getAttribute('data-publisher');

      document.getElementById('detailsModalLabel').textContent = title;
      document.getElementById('modalImage').src = img;
      document.getElementById('modalPublisher').textContent = "Published by: " + publisher;

      const modal = document.getElementById('detailsModal');
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      backdrop.id = 'custom-backdrop';
      document.body.appendChild(backdrop);
    });
  });
}

document.querySelector('#detailsModal .btn-close').addEventListener('click', () => {
  const modal = document.getElementById('detailsModal');
  modal.classList.remove('show');
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  const backdrop = document.getElementById('custom-backdrop');
  if (backdrop) backdrop.remove();
});

window.addEventListener('DOMContentLoaded', () => {
  fetchMeals('pizza');
});
