const tabsTitle = document.querySelectorAll('.tab_title');
const title = [];
tabsTitle.forEach(item =>{
    title.push(item);
})
title.push(document.getElementById("active_tab"));
const tabsContent = document.querySelectorAll('.tab_content');

title.forEach(item => item.addEventListener('click', event =>{
    const tabsTitleTarget = event.target.getAttribute('data-tab');

    title.forEach(el => el.classList.remove('active-tab'));
    title.forEach(el => el.classList.add('tab_title'));
    tabsContent.forEach(el => el.classList.add('hidden-tab-content'));

    item.classList.add('active-tab');
    item.classList.remove('tab_title');
    document.getElementById(tabsTitleTarget).classList.remove('hidden-tab-content');
}))