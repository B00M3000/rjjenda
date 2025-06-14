import { Section } from './models/section'

export default (section: Section) =>
	section.course.name + ' - section ' + String(section.number)