import {
  Mail,
  MapPin,
  Linkedin,
  Phone,
  Code2,
  Laptop,
  Briefcase,
} from "lucide-react"
import {
  useProfile,
  useSkills,
  useWorkExperience,
} from "../../hooks/useApiData"
import "./style.scss"

function About() {
  const { profile } = useProfile()
  const { skills } = useSkills()
  const { workExperience } = useWorkExperience()

  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-avatar">
          <div className="avatar-circle">
            <Code2 size={64} />
          </div>
        </div>
        <div className="about-intro">
          <h1>{profile?.name || ""}</h1>
          <h2 className="subtitle">{profile?.title || ""}</h2>
          <p className="intro-text">{profile?.summary || ""}</p>
        </div>
      </div>

      <div className="about-content">
        <section className="experience-section">
          <div className="section-header">
            <Briefcase size={28} />
            <h2>Work Experience</h2>
          </div>
          <div className="experience-timeline">
            {workExperience?.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-period">{exp.period}</span>
                  <h3>{exp.position}</h3>
                  <p className="company">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="description">{exp.description}</p>
                  <ul className="responsibilities">
                    {exp.responsibilities?.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="skills-section">
          <div className="section-header">
            <Laptop size={28} />
            <h2>Skills & Technologies</h2>
          </div>
          <div className="skills-content">
            <div className="skill-category">
              <h3>Hard Skills</h3>
              <div className="skill-tags">
                {skills?.hardSkills.hardSkills?.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <div className="skill-tags">
                {skills?.softSkills.softSkills?.map((skill, index) => (
                  <span key={index} className="skill-tag soft">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="section-header">
            <Mail size={28} />
            <h2>Get In Touch</h2>
          </div>
          <p className="contact-intro">
            Interested in collaboration or want to discuss a project? Feel free
            to reach out!
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile?.email || ""}`} className="contact-link">
              <Mail size={20} />
              <span>{profile?.email || "Loading..."}</span>
            </a>
            <a
              href={`https://wa.me/${(profile?.phone || "").replace(
                /[^0-9]/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Phone size={20} />
              <span>WhatsApp</span>
            </a>
            <a href={`tel:${profile?.phone || ""}`} className="contact-link">
              <Phone size={20} />
              <span>{profile?.phone || "Loading..."}</span>
            </a>
            <a
              href={`https://${profile?.linkedin || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Linkedin size={20} />
              <span>{profile?.linkedin || "Loading..."}</span>
            </a>
            <div className="contact-link">
              <MapPin size={20} />
              <span>{profile?.location || "Loading..."}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
