

export const register = async (req,res)=>{
res.status(200).json({
 msg: "all users"
})

}

export const posting = async  (req,res)=>{
  const data = req.body

  return res.status(201).json({
    msg:data
  
  })
}

export const studget = async (req,res)=>{
res.status(200).json({
 msg: "students get"
})

}

export const studpost = async  (req,res)=>{
  const studata = req.body

  return res.status(201).json({
    msg:studata
  
  })
}