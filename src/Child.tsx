const Child = (props: any) => {
  
    props.func('My name is Dean Winchester & this is my brother Sammie');
    
    return (
      <>
        <h1>I am the Child Component!</h1>
      </>
    );
  }
  
  export default Child;