export default function decorate(block){
    const allDivs= block.querySelectorAll('div');
    allDivs.forEach(function(div){
        div.classList.add('contactus-details');
    });
}