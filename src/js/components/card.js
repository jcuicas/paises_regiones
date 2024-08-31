export function Card(name, description, flag) {
    return `
        <div class="card mx-2" style="width: 18rem;">
            <img src="${flag}" class="card-img-top card-img" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                <a href="#" class="btn btn-primary align-bottom">Detalles...</a>
            </div>
        </div>
    `
} 