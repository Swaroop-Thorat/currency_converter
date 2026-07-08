const button=document.getElementById("but");
const from=document.getElementById("from");
const to=document.getElementById("to");
const val=document.getElementById("val");
const show=document.getElementById("show");

async function convert(){
  const From=from.value.toUpperCase();
  const To=to.value.toUpperCase();
  const Value=parseFloat(val.value);

  if (isNaN(Value)) {
        show.textContent = "Please enter a valid amount";
        return;
    }

    try{

 const res = await fetch(`https://v6.exchangerate-api.com/v6/${API}/latest/${From}`);

 const data=await res.json();

 if (data.result === "error" || !data.conversion_rates) { 
            show.textContent = "Invalid Currency"; 
            return;
        } 

  const rate=data.conversion_rates[To];
  const display = rate * Value;
  show.textContent=`${To} ${display.toFixed(5)}`;
  console.log(data);
}
catch(error){
        show.textContent = "Network error. Try again.";
        console.error(error);
}
}

button.addEventListener("click",function(){
  convert();
})