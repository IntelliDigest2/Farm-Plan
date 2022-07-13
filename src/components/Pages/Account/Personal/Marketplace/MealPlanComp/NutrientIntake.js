import React, { useState, useEffect } from "react";
import { Button, Card, Collapse, Accordion, Table} from "react-bootstrap";

export const NutrientIntake = (props) => {
    // array of nutrients consumed from all meals
    const [allTotalNutrients, setAllTotalNutrients] = useState([]);
    // array of RDI from nutrients consumed from all meals
    const [allTotalDaily, setAllTotalDaily] = useState([]);
    // used for text change in Accordion
    const [isExpanded, setIsExpanded] = useState(true);
    
    console.log("props.meals: ", props.meals)

    useEffect(() => {
        setAllTotalNutrients([]);
        setAllTotalNutrients(oldArr => {
            let arrNutrients = [...oldArr];
            let arrDaily = [];
            // forEach checks if nutrient object is already in array, if it is then 
            // add its quantity to prev quantity, if not then push the object to the array
            props.meals.forEach(element => {
                    Object.keys(element.totalNutrients).forEach(nutrient => {
                        let found = arrNutrients.find(tableNutrient => 
                            tableNutrient.label === element.totalNutrients[nutrient].label)
                        if(found) {
                            console.log("Table nutrient found")
                            found.quantity += element.totalNutrients[nutrient].quantity;
                        }
                        else {
                            arrNutrients.push(element.totalNutrients[nutrient]); console.log("Table nutrient not found")
                            if(element.totalDaily[nutrient])
                                arrDaily.push(element.totalDaily[nutrient]);
                        }
                        setAllTotalDaily(arrDaily);
                    })
                })
                arrNutrients.sort((a, b) => {
                    return a.label < b.label ? -1
                    : a.label > b.label ? 1
                    : 0
                });
                return arrNutrients;
            })

        setAllTotalDaily([]);
        setAllTotalDaily(oldArr => {
            let arr = [...oldArr];
            // forEach does the same as above forEach but for RDI
            props.meals.forEach(element => {
                    Object.keys(element.totalDaily).forEach(nutrient => {
                        let found = arr.find(tableNutrient =>
                             tableNutrient.label === element.totalDaily[nutrient].label)
                        if(found) {
                            console.log("Table RDI found")
                            found.quantity += element.totalDaily[nutrient].quantity;
                        }
                        else {arr.push(element.totalDaily[nutrient]); console.log("Table RDI not found")}

                    })
                })
            return arr;
        })
    }, [props.meals]);
    
    console.log("All Total Nutrients: ", allTotalNutrients);
    console.log("All Total Daily: ", allTotalDaily);

    const changeCellStyle = (rdiValue) => {
        return rdiValue <= 10 ? 'tomato' : rdiValue >=50 ? '#b3b785' : null; 
    }

    return (
        <div>

            <Accordion defaultActiveKey="0">
                <Accordion.Toggle as="div" 
                className="header"
                eventKey="0"
                onClick={() => setIsExpanded(!isExpanded)}>
                    Nutritional Information
                        <div className="header" style={{marginLeft: "auto", paddingRight: "10px"}}>
                            {isExpanded ? "Collapse" : "Expand"}
                        </div>
                </Accordion.Toggle>
                <Card>
                    <Card.Header></Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Table striped bordered hover condensed>
                                <thead>
                                    <tr>
                                        <th>Nutrient</th>
                                        <th>Quantity Consumed</th>
                                        <th>Reference Daily Intake (RDI)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTotalNutrients?.map(nutrient => {
                                        return (
                                                <tr style={{backgroundColor: changeCellStyle(allTotalDaily.find(element => 
                                                element.label === nutrient.label)?.quantity)}}>
                                                    <td>{nutrient.label}</td>
                                                    <td>{Math.round(nutrient.quantity * 10) / 10} {nutrient.unit}</td>
                                                    <td>{allTotalDaily.find(element => element.label === nutrient.label) ? 
                                                    `${allTotalDaily.find(element => element.label === nutrient.label)
                                                    .quantity.toFixed(1)} %` : '-'}</td>
                                                </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>


        </div>
    );
}
