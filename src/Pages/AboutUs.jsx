import HomeLayout from "../Layouts/HomeLayout"
import About_image from '../assets/Images/About_image.png'
import kalam from "../assets/Images/kalam.jpeg"
import Bill_Gates from "../assets/Images/Bill_Gates.jpeg"
import einstein from "../assets/Images/einstein.jpg"
import Nelson_mandela from "../assets/Images/Nelson_mandela.jpeg"
import SteveJobs from "../assets/Images/SteveJobs.jpeg"

function AboutUs() {
    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200"> 
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share 
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.
                        </p>
                    </section>

                    <div className="w-1/2">
                        <img
                            id="test1"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
                            }}
                            alt="About iamge"
                            className="drop-shadow-2xl"
                            src={About_image} 
                        />
                    </div>

                </div>

                <div className="carousel w-1/2 my-16 m-auto">
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={kalam} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"If you fail, never give up because FAIL means First Attempt In Learning."}
                            </p>
                            <h3 className="text-2xl font-semibold">A.P.J Abdul Kalam</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide5" className="btn btn-circle">❮</a> 
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={Bill_Gates} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"We all need people who will give us feedback. That’s how we improve."}
                            </p>
                            <h3 className="text-2xl font-semibold">Bill Gates</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a> 
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={einstein} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"Anyone who has never made a mistake has never tried anything new."}
                            </p>
                            <h3 className="text-2xl font-semibold">Einstein</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a> 
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> 
                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={Nelson_mandela} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"Education is most powerful tool you can use to change the world."}
                            </p>
                            <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a> 
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> 
                    <div id="slide5" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={SteveJobs} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"Design is not what it looks and feels like. Design is how it works"}
                            </p>
                            <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle">❮</a> 
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    
                    </div>
                    </div>

            </div>
        </HomeLayout>
        
    )
}

export default AboutUs