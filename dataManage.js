document.getElementById('submit-btn').addEventListener('click', () => {
    const inputValue = document.getElementById('input-meal').value;
    getMealData(inputValue);
})

function setPlaceholder() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('input-meal').placeholder = "Search " + data.meals[0].strMeal + " Meal";
        })
}

setInterval(() => {
    setPlaceholder();
}, 2000);

const getMealData = inputValue => {
    if (inputValue.length > 1) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
        getData(url);
    }
    else if (inputValue.length === 1) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
        getData(url);
    }
}

const getData = url => {
    fetch(url)
        .then(response => response.json())
        .then(data => makeDisplay(data))
}

const makeDisplay = data => {

    if (data.meals) {
        const parentDiv = document.getElementById('meal-info');

        data.meals.forEach(meals => {
            const childDiv = document.createElement('div');
            childDiv.className = 'meal-name';

            const mealInfo = `
            <img id="item-image" src="${meals.strMealThumb}">
            <h3 id="item-title" class="meals-title">${meals.strMeal}</h3>
        `;
            childDiv.innerHTML = mealInfo;
            parentDiv.appendChild(childDiv);

            document.getElementById('input-meal').value = "";
        });

        const errorArea = document.getElementById('error-area');
        errorArea.style.display = "none";
    }
    else {
        document.getElementById('error-text').innerText = "No item found";
        document.getElementById('input-meal').value = "";
        const errorArea = document.getElementById('error-area');
        errorArea.style.display = "block";
    }

    const mealInfo = document.getElementById('meal-info');
    mealInfo.addEventListener('click', (event) => {
        const selectedMeal = event.target.innerText;

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedMeal}`)
            .then(response => response.json())
            .then(data => showDetails(data, selectedMeal))
    })

    const showDetails = (data, selectedMeal) => {
        const parentDiv = document.getElementById('display-details');

        data.meals.forEach(meals => {
            if (meals.strMeal === selectedMeal) {
                const previousInfo = `
                    <img id="item-image" src="${meals.strMealThumb}">
                    <h3 id="item-title" class="meal-title">${meals.strMeal}</h3>
                    <h4>---Ingredient---</h4>
                `;

                parentDiv.innerHTML = previousInfo;

                const ul = document.createElement('ul');
                const detailsInfo = `
                    <li>${meals.strIngredient1}</li><br>
                    <li>${meals.strIngredient2}</li><br>
                    <li>${meals.strIngredient3}</li><br>
                    <li>${meals.strIngredient4}</li><br>
                    <li>${meals.strIngredient5}</li><br>
                    <li>${meals.strIngredient6}</li><br>
                    <li>${meals.strIngredient7}</li><br>
                    <li>${meals.strIngredient8}</li><br>
        
                    <button id="removeBtn" class="btn btn-warning remove-btn">Ok</button>
                `;

                ul.innerHTML = detailsInfo;
                parentDiv.appendChild(ul);

                const errorArea = document.getElementById('display-details');
                errorArea.style.display = "block";
                document.getElementById('removeBtn').addEventListener('click', () => {
                    const displayDetails = document.getElementById('display-details');
                    displayDetails.style.display = 'none';
                })
            }
        })
    }
}

