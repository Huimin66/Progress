function countDown() {
    let target_time = new Date('2022/04/10').getTime(),
    	current_time = new Date().getTime(),
        diff = target_time - current_time;
    if(diff < 0) return; 
        
    let day = Math.floor(diff / 1000 / 60 / 60 / 24),
        hour = Math.floor(diff / 1000 / 60 / 60 % 24),
        min = Math.floor(diff / 1000 / 60 % 60),
        sec = Math.floor(diff / 1000 % 60);
    
    document.getElementById('day').innerText = `${day}day`;
    console.log(day)
    document.getElementById('hour').innerText = `${hour}hour`;
    document.getElementById('minute').innerText = `${min}minute`;
    document.getElementById('second').innerText = `${sec}second`;
    
    setTimeout(countDown, 1000); 
}