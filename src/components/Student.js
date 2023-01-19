import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { padding } from '@mui/system';

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600, margin:'20px auto'}
    const marginStyle = {marginBottom:'10px'}
    const [name, setName] =React.useState('')
    const [address, setAddress] =React.useState('')
    const [students, setStudents] =React.useState([])
    const handleClick =(e)=>{
        e.preventDefault()
        const student = {name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)

        }).then(()=>{
            console.log("New Student added")
        })
    }
    React.useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        })
    })
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { marginBottom: 10 },
      }}
      noValidate
      autoComplete="off"
      
    >
    <Container>
        <Paper elevation = {3} style = {paperStyle}>
                <h1 style={{color:"blue"}}><u>Add Student</u></h1>
                <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth style ={marginStyle}
                value = {name}
                onChange={(e)=>setName(e.target.value)}/> 
                <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth style ={marginStyle}
                value = {address}
                onChange={(e)=>setAddress(e.target.value)} />
            <Button variant="contained" color="success" onClick={handleClick}>
                 Submit
            </Button>
        </Paper>
        <Paper elevation={3} style={paperStyle}>
            {students.map(student=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                    Id:{student.id}<br/>
                    Name:{student.name}<br/>
                    Address;{student.address}
                    </Paper>
            ))
            }
        </Paper>
    </Container>
    
    </Box>
  );
}
