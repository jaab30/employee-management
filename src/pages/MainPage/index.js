import React,  { useState, useEffect } from "react";
import Container from "../../components/Container";
import Jumbotron from "../../components/Jumbotron";
import Search from "../../components/Search";
import { Table, Thead, Th, Tbody, Tr, Td } from "../../components/Table";
import API from "../../utils/API";




function MainPage() {

    const [people, setPeople] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortAsc, setSortAsc] = useState([]);
    const [search, setSearch ] = useState("")

    const getRandomPeople = () => {
        API.getPeople()
            .then(data => {
                setPeople(data.data.results)
                setFiltered(data.data.results)
            })
            .catch(err => { console.log(err);
            })
    }

    useEffect(() => {
        getRandomPeople()
    }, [])
    
    const sortByFirstName = () => {
        
        if (sortAsc){
            filtered.sort((a, b) => (b.name.first > a.name.firts) ? 1 : -1)
            setSortAsc(false)
          
        } else {
            filtered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            setSortAsc(true)
        }
        setFiltered(filtered)
    }
    const sortByLastName = () => {
        
        if (sortAsc){
            filtered.sort((a, b) => (b.name.last > a.name.last) ? 1 : -1)
            setSortAsc(false)
        } else {
            filtered.sort((a, b) => (a.name.last > b.name.last) ? 1 : -1)
            setSortAsc(true)
        }
        setFiltered(filtered)
    }

    const sortByAge = () => {
        
        if (sortAsc){
            filtered.sort((a, b) => (b.dob.age > a.dob.age) ? 1 : -1)
            setSortAsc(false)
        } else {
            filtered.sort((a, b) => (a.dob.age > b.dob.age) ? 1 : -1)
            setSortAsc(true)
        }
        setFiltered(filtered)
    }

    const onChangeHandler = e => {
        
        setSearch(e.target.value)
        let peopleSearch = people.filter(item => {
            let values = item.name.last.toLowerCase();
            return ( values.indexOf(e.target.value) !== -1 ) 
        })
        setFiltered(peopleSearch)
    }


    return (
    <div>
        <Jumbotron>
            <Search 
                searchVal = {search}
                onChangeHandler = {onChangeHandler}
            />
        </Jumbotron>
        <Container>
            <Table>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>First Name <i className="fas fa-sort" onClick={sortByFirstName}></i></Th>
                        <Th>Last Name <i className="fas fa-sort" onClick={sortByLastName}></i></Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Age <i className="fas fa-sort" onClick={sortByAge}></i></Th>
                    </Tr>
                </Thead>
                <Tbody>
                {filtered.map((item, i) => (
                    <Tr key={i}>
                        <Td><img src={item.picture.medium} alt={item.firstName}/></Td>
                        <Td>{item.name.first}</Td>
                        <Td>{item.name.last}</Td>
                        <Td><a href={"mailto:"+item.email}>{item.email}</a></Td>
                        <Td>{item.phone}</Td>
                        <Td>{item.dob.age}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </Container>
    </div>
    )
}


export default MainPage;
