<h1>🏡 Airbnb Clone - Full Stack Demo</h1>

<p>
  <strong>Airbnb Clone</strong> is a full-stack web application built for learning and practice.
  The backend is developed using <strong>Django & Django REST Framework</strong>,
  and the frontend is built using <strong>Next.js</strong>.
</p>

<p>
  This project demonstrates authentication, API development, and frontend-backend integration
  similar to a real-world Airbnb platform.
</p>

<hr>

<h2>📌 Features</h2>
<ul>
  <li>✅ User registration and login</li>
  <li>✅ JWT-based authentication</li>
  <li>✅ Secure APIs using Django REST Framework</li>
  <li>✅ Social authentication support</li>
  <li>✅ Multi-factor authentication (MFA)</li>
  <li>✅ Real-time support using WebSockets</li>
  <li>✅ Modern frontend using Next.js</li>
</ul>

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> Python, Django, Django REST Framework</li>
  <li><strong>Authentication:</strong> SimpleJWT, dj-rest-auth, django-allauth</li>
  <li><strong>Real-Time:</strong> Django Channels, Daphne</li>
  <li><strong>Frontend:</strong> Next.js, React, TypeScript / JavaScript</li>

</ul>

<h2>📁 Project Structure</h2>
<p>
  The structure below excludes unnecessary and confidential files such as
  <code>node_modules</code>, <code>.venv</code>, <code>.env</code>, and database files.
</p>

<pre>
Airbnb-clone/
├── backend/                # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── chat/           
│   ├── djangobnb_backend/            
│   ├── media/               
│   ├── property/    
│   └── useraccount/          
│
├── frontendbnb/            # Next.js frontend
│   ├── public/             # Static assets
│   ├── src/                # Application source code
│   ├── package.json
│   └── next.config.js
│
├── .gitignore
└── README.md
</pre>

<h2>🔐 Authentication</h2>
<ul>
  <li>JWT-based authentication using SimpleJWT</li>
  <li>User login and registration APIs</li>
  <li>REST authentication using dj-rest-auth</li>
  <li>Social authentication using django-allauth</li>
  <li>Multi-factor authentication (MFA)</li>
</ul>

<h2>🔌 Real-Time Support</h2>
<ul>
  <li>Django Channels for WebSocket communication</li>
  <li>Daphne as the ASGI server</li>
  <li>Real time chat</li>
</ul>

<h2>🚀 Installation & Setup</h2>

<p><strong>Backend Setup:</strong></p>
<pre>
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
</pre>

<p><strong>Frontend Setup:</strong></p>
<pre>
cd frontendbnb
npm install
npm run dev
</pre>

<h2>🧪 Testing</h2>
<ul>
  <li>Backend API: http://127.0.0.1:8000/</li>
  <li>Frontend App: http://localhost:3000/</li>
</ul>

<h2>📚 Learning Objectives</h2>
<ul>
  <li>Understand full-stack application architecture</li>
  <li>Implement JWT authentication correctly</li>
  <li>Integrate Django backend with Next.js frontend</li>
  <li>Learn basics of WebSocket communication</li>
</ul>

<h2>👤 Author</h2>
<p>
  <strong>Kush Bharti</strong><br>
  GitHub: <a href="https://github.com/kushbharti">https://github.com/kushbharti</a>
</p>

<hr>
