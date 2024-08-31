export function Pagination(numberPage) {
    let html = `
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
            </li>    
    `

    for (let i = 0; i < numberPage; i++) {
        if (i == 1) {
            html += `
                <li class="page-item active" aria-current="page">
                    <a class="page-link" href="#">${i+1}</a>
                </li>            
            `
        } else {
            html += `
                <li class="page-item">
                  <a class="page-link" href="#">${i+1}</a>
                </li>        
            `
        }
    }

    html += `
            <li class="page-item">
              <a class="page-link" href="#">Siguiente</a>
            </li>
          </ul>
        </nav>    
    `

    return html
}