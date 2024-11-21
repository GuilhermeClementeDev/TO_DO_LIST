import React, {userState, useState} from "react";
import './TodoList.css'
import { isCompositeComponent } from "react-dom/test-utils";

function TodoList()
{
	const [lista, setLista] = useState([]);
	const [novoItem, setNovoItem] = useState([]);

	function adicionaItem(form){
		form.preventDefault();
		if(!novoItem)
			return;
		setLista([...lista, {text:novoItem, isCompleted: false}])
		setNovoItem("");
		document.getElementById('input_entrada').focus();
	}

	function clicou(index){
		const listaAux = [...lista];
		listaAux[index].isCompleted = !listaAux[index].isCompleted
		setLista(listaAux)
	}

	function deletando(index){
		const listaAux = [...lista];
		listaAux.splice(index, 1);
		setLista(listaAux);
	}

	function deletando_tudo()
	{
		setLista([]);
	}

	return (
		<div>
			<h1>To Do list</h1>
			<form onSubmit={adicionaItem}>
				<input
					id="input_entrada"
					type="text"
					value={novoItem}
					onChange={(e) => { setNovoItem (e.target.value)}}
					placeholder="Adicionar Tarefa"
				/>
				<button type="submit" className="add">Confirmar</button>
			</form>
			<div className="listaTarefas">
				<div>
					{
						lista.length <1
						? <img className="img_vazia" src="https://img.freepik.com/free-vector/faceless-woman-checking-giant-check-list-background_23-2148090966.jpg"/>
						: lista.map((item, index) =>(
							<div key={index} className={item.isCompleted ? "item completo" : "item"}>
								<span onClick={()=>{clicou(index)}}>{item.text}</span>
								<button onClick={()=>{deletando(index)}} className="delete">Deletar</button>
							</div>
						))
					}
				</div>
				<button onClick={()=>{deletando_tudo()}}className="deleteAll">Deletar Todos</button>
			</div>
		</div>
	)
}
export default TodoList
