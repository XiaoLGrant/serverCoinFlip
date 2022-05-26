document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  document.querySelector("#personName").textContent = data.name
  document.querySelector("#personStatus").textContent = data.status
  document.querySelector("#personOccupation").textContent = data.currentOccupation
  
}


// Coin FLip
document.querySelector('#flipCoin').addEventListener('click', flipCoin)

async function flipCoin() {
  const res = await fetch(`/api?coin`)
  const data = await res.json()

  console.log(data);
  document.querySelector('#coinResult').textContent = data.coinResult
}