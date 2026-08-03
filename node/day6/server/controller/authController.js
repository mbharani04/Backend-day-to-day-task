

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
