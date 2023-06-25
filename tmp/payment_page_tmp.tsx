function PayPage(){
  
  const handleButtonClick = () => {
    if (formRef.current) {
      console.log(formRef.current)
      formRef.current.submit();
    } else {console.log('ddd')}
  };
  
  function MyForm(props: MyFormProps) {
  return (
    <form {...props}>
      {props.children}
    </form>
  );
}
  const [userEmail, setUserEmail] = useState<string>('')
  const [toPay, setToPay] = useState<number>(0)
  const [payment, setPayment] = useState<string>('PayPal')
  const [showTransferMessage, setShowTransferMessage] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

      setPayMethod({children:children(90909, 'sdjs@sdkj.ds'), allow:"payment", name:"TinkoffPayForm", onSubmit:handlePaySubmit})

  const [payMethod, setPayMethod] = useState<{children:any, allow:string, name:string, onSubmit:(e: React.FormEvent<HTMLFormElement>)=>void}>(
        {children:<></>, allow:"payment", name:"aaa", onSubmit:()=>console.log('aaa')}
  )
  

  if (!window.pay) {
    console.log('no pay loaded')
  }
}
