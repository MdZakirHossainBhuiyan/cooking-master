document.getElementById('submit-btn').addEventListener('click', () => {
    const inputValue = document.getElementById('input-meal').value;
    getMealData(inputValue);
})

function setPlaceholder() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('input-meal').placeholder = "Search " + data.meals[0].strArea + " Meal";
        })
}

setInterval(() => {
    setPlaceholder();
}, 2000);

const getMealData = inputValue => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${inputValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => makeDisplay(data, inputValue))
}

const makeDisplay = (data, inputValue) => {

    if (data.meals) {
        const parentDiv = document.getElementById('meal-info');
        for (let i = 0; i < data.meals.length; i++) {
            const childDiv = document.createElement('div');
            childDiv.className = 'meal-name';

            const mealInfo = `
            <img id="item-image" src="${data.meals[i].strMealThumb}">
            <h3 id="item-title" class="meal-title">${data.meals[i].strMeal}</h3>
        `;
            childDiv.innerHTML = mealInfo;
            parentDiv.appendChild(childDiv);

            document.getElementById('input-meal').value = "";
        }
        const errorArea = document.getElementById('error-area');
        errorArea.style.display = "none";
        //const countValue = lengthCount(data.meals);
    }
    else {
        document.getElementById('error-text').innerText = "No item found for " + "'" + inputValue + "'";
        document.getElementById('input-meal').value = "";
        const errorArea = document.getElementById('error-area');
        errorArea.style.display = "block";
        // for (let i = 0; i < countValue; i++) {
        //     let h3 = document.getElementById('item-title');
        //     h3.remove();
        //     console.log(5);
        // }
    }

    // function lengthCount(value){
    //     let item = value.length;
    //     console.log(item);
    //     return item;
    // }

    const mealInfo = document.getElementById('meal-info');
    mealInfo.addEventListener('click', (event) => {
        const selectedMeal = event.target.innerText;

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedMeal}`)
            .then(response => response.json())
            .then(data => showDetails(data, selectedMeal))
    })

    const showDetails = (data, selectedMeal) => {
        const parentDiv = document.getElementById('display-details');
        for (let i = 0; i < data.meals.length; i++) {
            if (data.meals[i].strMeal === selectedMeal) {
                const previousInfo = `
                    <img id="item-image" src="${data.meals[i].strMealThumb}">
                    <h3 id="item-title" class="meal-title">${data.meals[i].strMeal}</h3>
                `;

                parentDiv.innerHTML = previousInfo;

                const ul = document.createElement('ul');
                const detailsInfo = `
                    <li>${data.meals[i].strIngredient1}</li><br>
                    <li>${data.meals[i].strIngredient2}</li><br>
                    <li>${data.meals[i].strIngredient3}</li><br>
                    <li>${data.meals[i].strIngredient4}</li><br>
                    <li>${data.meals[i].strIngredient5}</li><br>
                    <li>${data.meals[i].strIngredient6}</li><br>
                    <li>${data.meals[i].strIngredient7}</li><br>
                    <li>${data.meals[i].strIngredient8}</li><br>

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
                break;
            }
        }
    }
}

