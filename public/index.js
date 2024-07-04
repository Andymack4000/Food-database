const searchForm = document.getElementById("searchForm")
const searchField = document.getElementById("searchField")
const macroForm = document.getElementById("macro-form")
const macroMenu = document.getElementById("macro-menu")
const foodsTable = document.getElementById("table")
const macroFormProtein = document.getElementById("macro-form-protein")
const macroFormCarbs = document.getElementById("macro-form-carbs")
const macroFormFat = document.getElementById("macro-form-fat")
const macroFormLessThan = document.getElementById("less-than")
const macroFormMoreThan = document.getElementById("more-than")
const macroFormMoreOrLessThan = document.getElementById("less-or-more-than")
const macroFormPercentage = document.getElementById("macro-form-percentage")


searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("searchform submit works", searchField.value)
    const searchFood = searchField.value
    searchFoodQuery(searchFood)
})

const searchFoodQuery = async (searchFood) => {
    const response = await fetch("http://127.0.0.1:4040/foods")
    const data = await response.json()
    console.log(data)

    // filter data

    const filteredData = data.filter(item => item.description.includes(searchFood))
    console.log(filteredData)
    foodsTable.innerHTML = showTable(filteredData)
}

const showTable = (filteredData) => {
    let table = `
        <table>
        <tr>
        <th>Name</th>
        <th>Protein</th>
        <th>carbs</th>
        <th>fat</th>
        </tr>
        `
    filteredData.forEach(item => {
        table += `
        <tr>
        <td>${item.description}</td>
        <td>${item.protein}</td>
        <td>${item.carbohydrate}</td>
        <td>${item.total_fat}</td>
        </tr>
        `
    })
    table += `</table>`
    return table
}

macroForm.addEventListener("submit", (e) => {
    e.preventDefault()
    //console.log("Serch by macro working")
    let macroUserInput = {
        macroType: macroMenu.value, 
        moreOrLess: macroFormMoreOrLessThan.value, 
        percentage: macroFormPercentage.value
    }
    console.log(macroUserInput)
    searchByMacro(macroUserInput)
})

const searchByMacro = async (macro) => {
    console.log(macro.macroType, macro.moreOrLess, macro.percentage )
    const response = await fetch("http://127.0.0.1:4040/foods")
    const data = await response.json()

    //sorts data by description
    data.sort((a, b) => a.description.localeCompare(b.description));
    console.log(data)

    //refactor this when have chance
    if (macro.moreOrLess === "less-than") {
        if (macro.macroType === "protein") {
            foodsTable.innerHTML = showTable(data.filter(item => item.protein < macro.percentage))
        } 
        else if (macro.macroType === "carbohydrate") {
            foodsTable.innerHTML = showTable(data.filter(item => item.carbohydrate < macro.percentage))
        } 
        else {
        foodsTable.innerHTML = showTable(data.filter(item => item.total_fat < macro.percentage))
        }
    } 
    else {
        if (macro.macroType === "protein") {
                foodsTable.innerHTML = showTable(data.filter(item => item.protein > macro.percentage))
        } 
        else if (macro.macroType === "carbohydrate") {
                foodsTable.innerHTML = showTable(data.filter(item => item.carbohydrate > macro.percentage))
        } 
        else {
            foodsTable.innerHTML = showTable(data.filter(item => item.total_fat > macro.percentage))
        }
    
    }

}
