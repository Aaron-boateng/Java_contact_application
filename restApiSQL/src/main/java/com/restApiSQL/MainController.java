package com.restApiSQL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

import com.google.common.hash.Hashing;
import com.restApiSQL.Contact;
import com.restApiSQL.ContactRepository;
import com.restApiSQL.UserEnt;
import com.restApiSQL.UserRepository;
import com.restApiSQL.Groups;
import com.restApiSQL.GroupsRepository;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;

@Controller
@RequestMapping(path = "/contact")
public class MainController{

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupsRepository groupsRepository;

	private String redirectionRoute = "Redirection: /login";
	private String registerRoute = "Redirection: /register";
	private String contactRoute = "Redirection: /contact";
	private String groupListRoute = "Redirection: /group";

// Check if user is connected
	public Boolean securityHandler(HttpServletRequest req) {

		HttpSession session = req.getSession();
		String userToken = (String) session.getAttribute("sessionId");
		
		
		if (userToken != null) {

			Optional<UserEnt> currentUser = userRepository.findById(userToken);

			if (currentUser.isPresent()) {
				return true;
			}

			return false;

		}

		return false;

	}

//  Id generator
	public String generateId() {

		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		int randomNum = ThreadLocalRandom.current().nextInt(0, 1000000000 + 1);
		String shaTimeStamp = Hashing.sha256()
				.hashString(timeStamp.toString() + "aaron_secret_salt", StandardCharsets.UTF_8).toString();

		return shaTimeStamp;

	}

//	SHA256 Password hasher
	public String SHA256(String password) {

		String shaPassword = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();

		return shaPassword;

	}

// Contact list route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/")
	public @ResponseBody List<?> getContacts(HttpServletRequest req, HttpServletResponse resp) {


		Iterable<Contact> contact = contactRepository.findAll();
		List<Contact> list = new ArrayList<>();
		contact.forEach(list::add);
		return list;

	}

// Add contact route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/add/contact") // Map ONLY GET Requests
	public @ResponseBody List<String> addNewUser(@RequestParam String name, @RequestParam String firstname,
			@RequestParam String email, @RequestParam String number, HttpServletRequest req) {
			
			List<String> response = new ArrayList<String>();
			Contact n = new Contact();
			
			n.setName(name);
			n.setFirstname(firstname);
			n.setEmail(email);
			n.setNumber(number);

			contactRepository.save(n);
			response.add("saved");
			return response;


	}

// Read contact route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/read/contact/{contact_id}") // Map ONLY GET Requests
	public @ResponseBody List<?> readContact(@PathVariable("contact_id") Integer contact_id, HttpServletRequest req) {

		Optional<Contact> currentContact = contactRepository.findById(contact_id);

		if (currentContact.isPresent()) {

			Contact contact = currentContact.get();

			List<Contact> getContact = new ArrayList<>();
			getContact.add(contact);
			return getContact;
		}

		List<String> list = new ArrayList<String>();
		list.add("Not exist");
		return list;

	}

// Update contact route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/update/contact/{contact_id}") // Map ONLY GET Requests
	public @ResponseBody List<String> updateContact(@PathVariable("contact_id") Integer contact_id, HttpServletRequest req,
			@RequestParam String name, @RequestParam String firstname, @RequestParam String email, @RequestParam String number) {


		Optional<Contact> currentContact = contactRepository.findById(contact_id);
		List<String> response = new ArrayList<String>();

		if (currentContact.isPresent()) {

			Contact contact = currentContact.get();

			contact.setName(name);
			contact.setFirstname(firstname);
			contact.setEmail(email);
			contact.setNumber(number);
			
			contactRepository.save(contact);

			response.add("updated");
			return response;
		}

		response.add("not exist");
		return response;

	}

// Delete contact route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/delete/contact/{contact_id}") // Map ONLY GET Requests
	public @ResponseBody List<String> deleteContact(@PathVariable("contact_id") Integer contact_id, HttpServletRequest req) {


		Optional<Contact> currentContact = contactRepository.findById(contact_id);
		List<String> response = new ArrayList<>();
		
		if (currentContact.isPresent()) {

			Contact contact = currentContact.get();

			Set<Groups> groups = contact.getGroups();

			Set<Groups> contactGroups = contact.getGroups();

			for (Groups group : contactGroups) {

				group.getContact().remove(contact);

			}

			contactRepository.delete(contact);
			
		
			response.add("deleted");
			return response;
		}
	
		response.add("not exist");
		return response;


	}

// Group List route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/group")
	public @ResponseBody List<?> getGroups(HttpServletRequest req, HttpServletResponse resp) {


		Iterable<Groups> groups = groupsRepository.findAll();
		List<Groups> list = new ArrayList<>();
		groups.forEach(list::add);
		return list;


	}

// Create group route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/add/group") // Map ONLY GET Requests
	public @ResponseBody List<String> addNewGroup(@RequestParam String name, HttpServletRequest req) {

		Groups n = new Groups();
		List<String> response = new ArrayList<>();

		n.setName(name);

		groupsRepository.save(n);
		
		response.add("saved");
		return response;

	}

//	Read group route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/read/group/{group_id}") // Map ONLY GET Requests
	public @ResponseBody List<?> readGroup(@PathVariable("group_id") Integer group_id, HttpServletRequest req) {

			Optional<Groups> currentGroup = groupsRepository.findById(group_id);

			if (currentGroup.isPresent()) {

				Groups group = currentGroup.get();

				List<Groups> getGroup = new ArrayList<>();
				getGroup.add(group);
				return getGroup;
			}
			
			List<String> getGroup = new ArrayList<>();
			getGroup.add("Not exist");
			return getGroup;
			
	}

//	Update group route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/update/group/{group_id}") // Map ONLY GET Requests
	public @ResponseBody List<String> updateGroup(@PathVariable("group_id") Integer group_id, HttpServletRequest req,
			@RequestParam String name) {


		Optional<Groups> currentGroup = groupsRepository.findById(group_id);
		List<String> response = new ArrayList<>();
		
		if (currentGroup.isPresent()) {

			Groups group = currentGroup.get();

			group.setName(name);

			groupsRepository.save(group);

			response.add("updated");
			return response;
		}

		response.add("not exist");
		return response;


	}

//	Delete group route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/delete/group/{group_id}") // Map ONLY GET Requests
	public @ResponseBody List<String> deleteGroup(@PathVariable("group_id") Integer group_id, HttpServletRequest req) {


		Optional<Groups> currentGroup = groupsRepository.findById(group_id);
		List<String> response = new ArrayList<>();

		if (currentGroup.isPresent()) {

			Groups group = currentGroup.get();

			groupsRepository.delete(group);

			response.add("deleted");
			return response;
		}

		response.add("not exist");
		return response;

	}

// Group add user route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/group/{group_id}/add/contact/{user_id}")
	public @ResponseBody String addUserToGroup(@PathVariable("group_id") Integer group_id,
			@PathVariable("user_id") Integer user_id, HttpServletRequest req) {

		Optional<Groups> currentGroup = groupsRepository.findById(group_id);
		Optional<Contact> currentContact = contactRepository.findById(user_id);

		if (currentGroup.isPresent() && currentContact.isPresent()) {

			Groups group = currentGroup.get();
			Contact contact = currentContact.get();

			group.getContact().add(contact);
			contact.getGroups().add(group);

			groupsRepository.save(group);

			return groupListRoute;

		}

		return "Error: not exist";

	}

//	Search contact route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/search/contact/{keywords}")
	public @ResponseBody List<?> getContactResult(@PathVariable("keywords") String keywords,HttpServletRequest request, HttpServletResponse response) {

		List<Contact> contactsByFirstName = contactRepository.findByName(keywords);
		List<Contact> concactsByName = contactRepository.findByFirstname(keywords);
		List<Contact> contactList = new ArrayList<Contact>();;
			
		for ( Contact contact : contactsByFirstName) {
				
			contactList.add(contact);
				
		}
			
		for ( Contact contact : concactsByName) {
				
			contactList.add(contact);
				
		}
			
		return contactList;

	}
	
//	Search group route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/search/group/{keywords}")
	public @ResponseBody List<?> getGroupResult(@PathVariable("keywords") String keywords,HttpServletRequest request, HttpServletResponse response) {


		List<Groups> groups = groupsRepository.findByName(keywords);
		
		return 	groups;
		
	}
	
// Login route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/login")
	public @ResponseBody boolean Login(@RequestParam String email, @RequestParam String password, HttpServletRequest request, HttpServletResponse response) {

		List<String> list = new ArrayList<String>();

		UserEnt ur = new UserEnt();
		String hashedPassword = SHA256(password);

		List<UserEnt> currentUser = userRepository.findByEmailAndPassword(email, hashedPassword);

		if (currentUser.size() > 0) {

			HttpSession session = request.getSession();
			String sessionId = currentUser.get(0).getId();
			session.setAttribute("sessionId", sessionId);
			String userToken = (String) session.getAttribute("sessionId");
		
			return true;

		}
		
		return false;

	}

// Register route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/register") // Map ONLY GET Requests
	public @ResponseBody List<String> registerUser(@RequestParam String email, @RequestParam String password) {

		Integer users = (int) userRepository.count();
		List<String> response = new ArrayList<String>();

		if (users == 0) {
			
			String hashedPassword = SHA256(password);
			UserEnt ur = new UserEnt();
			String generatedId = generateId();

			ur.setId(generatedId);
			ur.setEmail(email);
			ur.setPassword(hashedPassword);

			response.add("saved");
			userRepository.save(ur);
			return response;
		}

		response.add("exist");
		return response;

	}

//	Logout route
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/logout")
	public @ResponseBody String Logout(HttpServletRequest request, HttpServletResponse response) {

		HttpSession session = request.getSession();
		session.setAttribute("sessionId", "");

		return this.contactRoute;

	}

}