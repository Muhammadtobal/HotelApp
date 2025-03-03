import prisma from "../prisma/client.js";

export async function updateUserService({ _id, email, name, password, isAdmin }) {
  const userlExist= await prisma.user.findUnique({where:{id:_id}})
  if (email && email !== userlExist.email) {
    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist) {
      throw new Error("Email should be unique");
    }
  }

 

const updateFields={
  ...(name && { name }),
  ...(email && { email }),
  ...(password && { password }),
  ...(isAdmin && { isAdmin })
} 

  const result = await prisma.user.update({
    where: { id: _id },
    data: 
      updateFields
    ,
  });
  return result ;
}
