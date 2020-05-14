import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuidv4} from 'uuid';

const initialExpenses = [
  {id: uuidv4(), charge: 'rent', amount: 1600},
  {id: uuidv4(), charge: 'car', amount: 300},
  {id:uuidv4(), charge: "food", amount: 200}
];

// import useState
// function returns [] with two values
// the actual value updates/control
// default value
function App() {
  // ***** state values *****
 // ***** all expenses, add expense *****
  const [expenses, setExpeneses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('');

  // single amount
  const [amount, setAmount] = useState('');

  // alert
  const [alert, setAlert] = useState({show:false});
  
  //edit
  const[edit, setEdit] = useState(false);

  //edit item
  const [id, setId] = useState(0);
  // ***** functionality *****

  // handle charge
  const handleCharge = e => {
    
    setCharge(e.target.value);
  };

  // handle amount
  const handleAmount = e => {
    
    setAmount(e.target.value);
  };

  // handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(()=>{setAlert({show:false})},3000);
  };

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount  >0) {
        const singleExpense = {id: uuidv4(), charge, amount};
        setExpeneses([...expenses, singleExpense]);
        handleAlert({type: 'success', text: "Item added"})
        setCharge('');
        setAmount('');
    } else {
      // handle alert called
      handleAlert({type: 'danger', text: `charge amount can't be empty and amount value
      has to be bigger than zero`});
    }
  };

  // clear all items
    const clearItems = () => {
      setExpeneses([]);
      handleAlert({type: "danger", text: " all items cleared"})
    };
    

  // handle delete
    const handleDelete = (id) => {
      let tempExpenses = expenses.filter(item => item.id !== id);
      setExpeneses(tempExpenses);
      handleAlert({type: "danger", text: "item delelted"})
    };

  // handle Edit
  const handleEdit = (id) => {
    console.log(`item edited: ${id}`);
  }  

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
     <h1>Budget tracker</h1>
     <main className="App">
     <ExpenseForm charge={charge} amount={amount}
     handleAmount={handleAmount} 
     handleCharge={handleCharge} 
     handleSubmit={handleSubmit}/>

     <ExpenseList expenses={expenses} 
     handleDelete={handleDelete} 
     handleEdit={handleEdit} 
     clearItems={clearItems}/>

     </main>
      <h1>total spending : <span className="total">$ {expenses.reduce((acc, curr)=>{
        return (acc += parseInt(curr.amount));
      },0)}</span></h1>
    </>
  );
};


export default App;