import { useEffect, useRef } from "react"


const HomeAbout = () => {

const homeRef = useRef()
const aboutRef = useRef()
const contactRef = useRef()

const home = ()=>{

homeRef.current.scrollIntoView({
behavior : "smooth"

})

}

const about = ()=>{
    aboutRef.current.scrollIntoView({
behavior : "smooth"

})
}

const contact = ()=>{
    contactRef.current.scrollIntoView({
behavior : "smooth"

})
}

const moveTotop =()=>{

window.scrollTo({
    top:0,
    behavior : "smooth"
})

    }

useEffect(()=>{

window.scrollTo({
    top:0,
    behavior : "smooth"
})
})


  return (
    <>
    
    <div>


        <h1>task-3</h1>
<div className=" flex flex-row gap-6">
    <button 
    className="bg-amber-400 rounded-2xl w-30"
    onclick ={home}>home</button>

    <button 
    className="bg-amber-400 rounded-2xl w-30"
    onclick = {about}>about</button>

    <button 
    className="bg-amber-400 rounded-2xl w-30"
    onclick = {contact}>contact</button>
</div>







       
        
 <section ref= {homeRef}>
      <div className="bg-blue-800 flex justify-around p-3 m-2">  <p>HOME  PAGE  </p></div>
            <p>
             
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore, vitae sequi ipsam, nihil temporibus maiores nesciunt quos ullam, accusamus maxime quasi eos in quibusdam. Velit autem reprehenderit illo ullam!
                Cupiditate facere qui in incidunt! Vel, quae? Nesciunt dolor voluptatem veniam ullam, eligendi delectus earum, magnam provident quaerat corporis numquam fugit? Possimus magni deleniti voluptate corporis dolores quas deserunt modi.
                Voluptates similique excepturi temporibus pariatur mollitia nulla cupiditate accusamus esse ut ducimus, ratione quidem expedita eum, eligendi dolorem praesentium beatae dolores nesciunt nam aspernatur dolor cumque voluptas fugiat blanditiis? Provident.
                Exercitationem, nihil blanditiis. Eaque enim nesciunt mollitia eveniet consectetur ratione vitae, quaerat amet. Voluptatibus enim quibusdam quae similique officia aut, vitae suscipit expedita animi, consequatur earum deleniti libero commodi adipisci!
                Reprehenderit, quia accusantium ad qui repellendus tempore. Sapiente quo a, soluta atque incidunt sed deserunt modi reiciendis ipsam! Dolorum tempora amet qui praesentium repellat id hic magni quaerat dicta accusamus?
                Similique officiis molestiae est molestias excepturi sapiente tenetur cumque totam architecto, aliquam nostrum ipsum ea in explicabo nam autem voluptas blanditiis rerum omnis ad perspiciatis? Optio asperiores dolor laborum dicta?
                Accusamus totam quis officia earum, consequatur necessitatibus iste, eum at exercitationem sit officiis dolorem provident harum? Praesentium magni minima officiis nemo magnam perspiciatis exercitationem temporibus? Sit veritatis nostrum iusto sunt?
                Earum ab culpa nemo quasi voluptatum maiores eos repellendus quibusdam dignissimos fugiat, expedita placeat aspernatur non commodi perspiciatis cumque iure dolor qui. Officia, aliquid. Pariatur ut vel inventore fugiat voluptatibus.
                Nemo, porro eos modi exercitationem est voluptatibus mollitia eaque? Quibusdam fugiat quisquam dolorem nisi, quia modi culpa beatae explicabo ab repellat eaque eligendi rem saepe blanditiis distinctio asperiores, quos minus.
                Sit esse quas nesciunt voluptatibus modi libero dicta rem itaque veniam distinctio, reiciendis ut tempora, recusandae ipsa nam. Non debitis assumenda ipsa maiores sequi modi, ducimus necessitatibus tempora unde consectetur.
            </p>
        </section>

         <section ref= {aboutRef}>
              <div className="bg-blue-800 flex justify-around p-3 m-2">  <p>ABOUT  PAGE  </p></div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore, vitae sequi ipsam, nihil temporibus maiores nesciunt quos ullam, accusamus maxime quasi eos in quibusdam. Velit autem reprehenderit illo ullam!
                Cupiditate facere qui in incidunt! Vel, quae? Nesciunt dolor voluptatem veniam ullam, eligendi delectus earum, magnam provident quaerat corporis numquam fugit? Possimus magni deleniti voluptate corporis dolores quas deserunt modi.
                Voluptates similique excepturi temporibus pariatur mollitia nulla cupiditate accusamus esse ut ducimus, ratione quidem expedita eum, eligendi dolorem praesentium beatae dolores nesciunt nam aspernatur dolor cumque voluptas fugiat blanditiis? Provident.
                Exercitationem, nihil blanditiis. Eaque enim nesciunt mollitia eveniet consectetur ratione vitae, quaerat amet. Voluptatibus enim quibusdam quae similique officia aut, vitae suscipit expedita animi, consequatur earum deleniti libero commodi adipisci!
                Reprehenderit, quia accusantium ad qui repellendus tempore. Sapiente quo a, soluta atque incidunt sed deserunt modi reiciendis ipsam! Dolorum tempora amet qui praesentium repellat id hic magni quaerat dicta accusamus?
                Similique officiis molestiae est molestias excepturi sapiente tenetur cumque totam architecto, aliquam nostrum ipsum ea in explicabo nam autem voluptas blanditiis rerum omnis ad perspiciatis? Optio asperiores dolor laborum dicta?
                Accusamus totam quis officia earum, consequatur necessitatibus iste, eum at exercitationem sit officiis dolorem provident harum? Praesentium magni minima officiis nemo magnam perspiciatis exercitationem temporibus? Sit veritatis nostrum iusto sunt?
                Earum ab culpa nemo quasi voluptatum maiores eos repellendus quibusdam dignissimos fugiat, expedita placeat aspernatur non commodi perspiciatis cumque iure dolor qui. Officia, aliquid. Pariatur ut vel inventore fugiat voluptatibus.
                Nemo, porro eos modi exercitationem est voluptatibus mollitia eaque? Quibusdam fugiat quisquam dolorem nisi, quia modi culpa beatae explicabo ab repellat eaque eligendi rem saepe blanditiis distinctio asperiores, quos minus.
                Sit esse quas nesciunt voluptatibus modi libero dicta rem itaque veniam distinctio, reiciendis ut tempora, recusandae ipsa nam. Non debitis assumenda ipsa maiores sequi modi, ducimus necessitatibus tempora unde consectetur.
            </p>
        </section>

         <section ref= {contactRef}>
            <div className="bg-blue-800 flex justify-around p-3 m-2 ">  <p>CONTACT  PAGE  </p></div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore, vitae sequi ipsam, nihil temporibus maiores nesciunt quos ullam, accusamus maxime quasi eos in quibusdam. Velit autem reprehenderit illo ullam!
                Cupiditate facere qui in incidunt! Vel, quae? Nesciunt dolor voluptatem veniam ullam, eligendi delectus earum, magnam provident quaerat corporis numquam fugit? Possimus magni deleniti voluptate corporis dolores quas deserunt modi.
                Voluptates similique excepturi temporibus pariatur mollitia nulla cupiditate accusamus esse ut ducimus, ratione quidem expedita eum, eligendi dolorem praesentium beatae dolores nesciunt nam aspernatur dolor cumque voluptas fugiat blanditiis? Provident.
                Exercitationem, nihil blanditiis. Eaque enim nesciunt mollitia eveniet consectetur ratione vitae, quaerat amet. Voluptatibus enim quibusdam quae similique officia aut, vitae suscipit expedita animi, consequatur earum deleniti libero commodi adipisci!
                Reprehenderit, quia accusantium ad qui repellendus tempore. Sapiente quo a, soluta atque incidunt sed deserunt modi reiciendis ipsam! Dolorum tempora amet qui praesentium repellat id hic magni quaerat dicta accusamus?
                Similique officiis molestiae est molestias excepturi sapiente tenetur cumque totam architecto, aliquam nostrum ipsum ea in explicabo nam autem voluptas blanditiis rerum omnis ad perspiciatis? Optio asperiores dolor laborum dicta?
                Accusamus totam quis officia earum, consequatur necessitatibus iste, eum at exercitationem sit officiis dolorem provident harum? Praesentium magni minima officiis nemo magnam perspiciatis exercitationem temporibus? Sit veritatis nostrum iusto sunt?
                Earum ab culpa nemo quasi voluptatum maiores eos repellendus quibusdam dignissimos fugiat, expedita placeat aspernatur non commodi perspiciatis cumque iure dolor qui. Officia, aliquid. Pariatur ut vel inventore fugiat voluptatibus.
                Nemo, porro eos modi exercitationem est voluptatibus mollitia eaque? Quibusdam fugiat quisquam dolorem nisi, quia modi culpa beatae explicabo ab repellat eaque eligendi rem saepe blanditiis distinctio asperiores, quos minus.
                Sit esse quas nesciunt voluptatibus modi libero dicta rem itaque veniam distinctio, reiciendis ut tempora, recusandae ipsa nam. Non debitis assumenda ipsa maiores sequi modi, ducimus necessitatibus tempora unde consectetur.
            </p>
        </section>

        <button className="bg-emerald-500 rounded-2xl w-30"
        onclick = {moveTotop}>move to top </button>
    </div>
    
    
    
    
    
    </>
  )
}

export default HomeAbout