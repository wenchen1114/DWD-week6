let send = document.getElementById('send');
let show = document.getElementById('show');
let day = document.getElementById('day');
let mood = document.getElementById('mood');

window.addEventListener("DOMContentLoaded", () => {
send.onclick = async() => {
    fetch("/api/v1/mood",
    { method: "POST",
      body: JSON.stringify({
          "day": day.value,
          "mood": mood.value
    }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

}
show.onclick = async() =>{
  let data = fetch("/api/v1/mood",{method: "GET"})
  data = await (await data).json();
  for(let i = 0; i<data.length; i++){
      if(data[i].mood == 'great'){
        let day = data[i].day;
        document.getElementById(`${day}`).style.backgroundColor = '#F39090';
      }else if(data[i].mood == 'good'){
        let day = data[i].day;
        document.getElementById(`${day}`).style.backgroundColor =  '#FEE58C';
      }else if(data[i].mood == 'soso'){
        let day = data[i].day;
        document.getElementById(`${day}`).style.backgroundColor =  '#C1ECBA';
      }else if(data[i].mood == 'notgood'){
        let day = data[i].day;
        document.getElementById(`${day}`).style.backgroundColor =  '#AEE2EE';
      }else if(data[i].mood == 'notgood'){
        let day = data[i].day;
        document.getElementById(`${day}`).style.backgroundColor =  '#7EBAC7';
      }else{
        document.getElementById(`${i+1}`).style.backgroundColor = '#ffffff';
      }
  }
  console.log(data);
}  
})