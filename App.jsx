import React, { useRef, useState } from 'react'

export default function App() {

    const [balance, setBalance] = useState(0);
    const amountInput = useRef();
    const handleDelete = (index) => {
        setTransaction((prevTransactions) =>
            prevTransactions.filter((_, i) => i !== index)
        );
    }; const [transaction, setTransaction] = useState([
        // {
        //     before: 0,
        //     type: "deposit",
        //     amount: 1000,
        //     after: 1000
        // },
        // {
        //     before: 0,
        //     type: "deposit",
        //     amount: 1000,
        //     after: 1000
        // },
        // {
        //     before: 0,
        //     type: "deposit",
        //     amount: 1000,
        //     after: 1000
        // }
    ])
    const deposit = () => {
        let amount = +amountInput.current.value;
        setTransaction([...transaction, {

            before: balance,
            type: "deposit",
            amount: amount,
            after: balance + amount,
        }
        ])
        setBalance(balance + amount)
        amountInput.current.value = ""
    }
    const withdraw = () => {
        let amount = +amountInput.current.value;
        if (amount <= balance) {

            setTransaction([...transaction, {

                before: balance,
                type: "withdraw",
                amount: amount,
                after: balance - amount,
            }
            ])
            setBalance(balance - amount)
            amountInput.current.value = ""

        }
        // (amount >= balance) &&
    }
    return (
        <div className=' App col-12 d-flex flex-wrap'>
            <h1 className='col-12  p-3 bg-primary text-light '>Balacne is : {balance}</h1>
            <div className='d-flex col-6 p-3'>
                <input ref={amountInput} className='form-control' placeholder='Amount' />
                <button className='btn btn-success' onClick={deposit}>Deposit</button>
                <button className='btn btn-danger' onClick={withdraw}>Withdraw</button>
            </div>
            <table className='table table-dark table-bordered'>
                <thead>
                    <tr>

                        <th>-</th>
                        <th>Before Balance</th>
                        <th>Transaction Type</th>
                        <th>Transaction Amount</th>
                        <th>After Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        transaction.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>{el.before}</th>
                                    <th> <p className={`btn btn-${el.type == "deposit" ? "success" : "danger"}`}>{el.type}</p></th>
                                    <th>{el.type == "deposit" ? "+" : "-"}  {el.amount}</th>
                                    <th>{el.after}</th>
                                    <th>
                                        {(transaction.length - 1 == index) &&
                                            (
                                                <button className='btn btn-danger' onClick={() => handleDelete(index)}>
                                                    Delete
                                                </button>

                                            )
                                        }
                                    </th>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
