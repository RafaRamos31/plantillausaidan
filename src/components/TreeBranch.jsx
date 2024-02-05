import { Checkbox, FormControlLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react'
import { Col } from "react-bootstrap";
import { TreeItem, TreeView } from "@mui/x-tree-view";

export const TreeBranch = ({values, setValues, edit=false}) => {

  const [branchValues, setBranchValues] = useState(values)

  const handleClick = ({event, categoria, key}) => {
    event.stopPropagation();
    setBranchValues({...branchValues, [categoria]: {...branchValues[categoria], [key]: !branchValues[categoria][key]}})
  };

  const handleClickCategoria = ({event, categoria}) => {
    event.stopPropagation();
    toggleAllCategoria({categoria, valor: event.target.checked});
  };

  const toggleAllCategoria = ({categoria, valor}) => {
    const newbranchValues = { ...branchValues };

    for (const campo in newbranchValues[categoria]) {
      newbranchValues[categoria][campo] = valor;
    }
    setBranchValues(newbranchValues)
  }

  useEffect(() => {
    setValues(branchValues)
  }, [branchValues, setValues])
  

  const elementos = [];
  for (let categoriaKey in branchValues) {
    const subElementos = [];
    for (let key in branchValues[categoriaKey]) {
      subElementos.push(
        <div key={`${categoriaKey}.${key}`} className="d-block">
          <FormControlLabel
            key={`${categoriaKey}.${key}`}
            label={key}
            control={
              <Checkbox onClick={(e) => handleClick({event: e, categoria: categoriaKey, key: key})} checked={branchValues[categoriaKey][key]}/>
            }
          />
        </div>
        
      );
    }
    
    elementos.push(
      <Col key={categoriaKey} className="px-3 mb-2" lg={3}>
        <TreeItem
          key={categoriaKey}
          nodeId={categoriaKey}
          label={
            <>
            {
              edit ?
              <>
              <Checkbox
                onClick={(e) => handleClickCategoria({event: e, categoria: categoriaKey})}
                checked={Object.values(branchValues[categoriaKey]).every(valor => valor === true)}
                indeterminate={!(Object.values(branchValues[categoriaKey]).every(valor => valor === true) || Object.values(branchValues[categoriaKey]).every(valor => valor === false))}
              />
              {categoriaKey}
              </>
              :
              <>
              <Checkbox
                onClick={(e) => handleClickCategoria({event: e, categoria: categoriaKey})}
                indeterminate={!(Object.values(branchValues[categoriaKey]).every(valor => valor === true) || Object.values(branchValues[categoriaKey]).every(valor => valor === false))}
              />
              {categoriaKey}
              </>
            }
            </>
          }
        >
          {
          subElementos
        }
        </TreeItem>
      </Col>
    );
  }

  return (
    <TreeView
      className="d-flex flex-wrap"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {
      elementos
      }
    </TreeView>
  );
}
