/* Desenvolva sua lógica aqui... */

const applyedJobs = []

function createJobList(){
    let localData = JSON.parse(localStorage.getItem("appliedJobs")) || []
    const jobsList = document.querySelector('.card-1_ul')
    const showAppliedJobs = document.querySelector('.card-2_ul')   

    jobsData.forEach(job => { 
    const cardList = document.createElement('li') 
    const cardTitle = document.createElement('h2') 
    const cardContainer = document.createElement('div') 
    const cardCompanyAndLocation = document.createElement('span') 
    const cardJobDescription = document.createElement('p') 
    const cardBtnContainer = document.createElement('div')
    const cardJobModalities = document.createElement('span') 
    const cardBtn = document.createElement('button')
 
   
    cardList.classList = 'card-1_li flex_column'
    cardTitle.classList = 'card-1_li_title title-4' 
    cardContainer.classList = 'card-1_li_div flex_row gap-1'
    cardCompanyAndLocation.classList = 'card-1_li_div_span-1 text-3' 
    cardJobDescription.classList = 'card-1_li_div_p text-2'
    cardBtnContainer.classList = 'section-1_desktop'
    cardJobModalities.classList = 'card-1_li_div_span-2 text-3'
    cardBtn.classList = 'card-1_li_div_button button border_none button_add_card'

    cardTitle.innerText = job.title
    cardCompanyAndLocation.innerText = (`${job.enterprise} - ${job.location}`)
    cardJobDescription.innerText = job.description
    cardJobModalities.innerText = job.modalities[0]

    if(localData.filter(element => element.title == job.title).length > 0){
        cardBtn.innerText = 'Remover candidatura'
    }else{
        cardBtn.innerText = 'Candidatar'
    }
    
    cardBtn.addEventListener('click', function(){ 
        showAppliedJobs.innerHTML = ''

        if(cardBtn.innerText == 'Candidatar'){  
            cardBtn.innerText = 'Remover candidatura'
            let newObject = {
                id:job.id, 
                title:job.title, 
                enterprise:job.enterprise, 
                location:job.location
            }
            applyedJobs.push(newObject)
            localStorage.setItem("appliedJobs", JSON.stringify(applyedJobs))
            renderSectionAside(applyedJobs) 
        }else{
            cardBtn.innerText = 'Candidatar' 
            let indexAside = applyedJobs.indexOf(job)
            applyedJobs.splice(indexAside, 1)
            localStorage.setItem("appliedJobs", JSON.stringify(applyedJobs))
            renderSectionAside(applyedJobs)
        }
    })

    cardBtnContainer.append(cardJobModalities, cardBtn)
    cardContainer.append(cardCompanyAndLocation)
    cardList.append(cardTitle, cardContainer, cardJobDescription, cardBtnContainer)
    jobsList.appendChild(cardList)
    });
    return jobsList
}

function showAppliedJobs(appliedList){
        const showAppliedJobs = document.querySelector('.card-2_ul')
        const jobsList = document.querySelector('.card-1_ul')
        appliedList.forEach(job => {
        const cardList = document.createElement('li')
        const cardAppliedContainer = document.createElement('div')
        const cardAppliedTitle = document.createElement('h2')
        const cardAppliedRemoveBtn = document.createElement('button')
        const cardAppliedRemoveBtnImg = document.createElement('img')
        const cardAppliedCompanyAndLocationContainer = document.createElement('div')
        const cardAppliedCompanyAndLocation = document.createElement('span')

        cardList.classList = 'card-2_li flex_column'
        cardAppliedContainer.classList = 'card-2_div flex_row align_center justify_between'
        cardAppliedTitle.classList = 'card-2_li_title title-5'
        cardAppliedRemoveBtn.classList = 'card-2_li_button'
        cardAppliedCompanyAndLocationContainer.classList = 'card-2_div-2 flex_row gap-1'
        cardAppliedCompanyAndLocation.classList = 'card-2_span text-3'

        cardAppliedTitle.innerText = job.title
        cardAppliedCompanyAndLocation.innerText = (`${job.enterprise} - ${job.location}`)
        cardAppliedRemoveBtnImg.src = 'assets/img/trash.png'
        
        cardAppliedRemoveBtn.addEventListener('click', function(){
            showAppliedJobs.innerHTML = ''
            jobsList.innerHTML = ''
            let indexAside = applyedJobs.indexOf(job)
            applyedJobs.splice(indexAside, 1)
            localStorage.setItem("appliedJobs", JSON.stringify(applyedJobs))
            renderCatalogSection()
            renderSectionAside(applyedJobs)
        })

        cardAppliedCompanyAndLocationContainer.append(cardAppliedCompanyAndLocation)
        cardAppliedRemoveBtn.appendChild(cardAppliedRemoveBtnImg)
        cardAppliedContainer.append(cardAppliedTitle, cardAppliedRemoveBtn)
        cardList.append(cardAppliedContainer, cardAppliedCompanyAndLocationContainer)
        showAppliedJobs.appendChild(cardList)
    })
    return showAppliedJobs
}

function createEmptyApplyedList(){ 
    const showAppliedJobs = document.querySelector('.card-2_ul')
    const emptyList = document.createElement('div') 
    const emptyListTexts = document.createElement('p')

    emptyListTexts.innerText = 'Você ainda não aplicou para nenhuma vaga!'
    emptyList.appendChild(emptyListTexts)
    showAppliedJobs.appendChild(emptyList)
    return showAppliedJobs
}

function renderCatalogSection(){
    const catalogSection = document.querySelector('#sectionOne')
    return catalogSection.appendChild(createJobList())
}

function renderSectionAside(list){
    const asideSection = document.querySelector('.card-2')
    if(list.length == 0){
        return asideSection.appendChild(createEmptyApplyedList())
    }else{
        return asideSection.appendChild(showAppliedJobs(list))
    }
}

function getJsonItem(){
    return JSON.parse(localStorage.getItem("appliedJobs")) || []
}

renderSectionAside(getJsonItem())

renderCatalogSection()