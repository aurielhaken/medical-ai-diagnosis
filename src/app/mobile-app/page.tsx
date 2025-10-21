export default function MobileApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏥 MyDoc-AI Mobile
          </h1>
          <p className="text-cyan-200 text-lg">
            Application mobile de diagnostic médical
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cyan-100 mb-4">
              📱 Application Mobile
            </h2>
            <p className="text-white/80 mb-6">
              Votre application mobile MyDoc-AI est prête !
            </p>
            
            <div className="space-y-4">
              <a 
                href="/mobile-direct.html" 
                className="block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Ouvrir l'Application Mobile
              </a>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">🔍 Diagnostics</h3>
                  <p className="text-white/80 text-sm">Diagnostics médicaux précis avec IA</p>
                </div>
                
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">📱 Mobile</h3>
                  <p className="text-white/80 text-sm">Interface optimisée pour mobile</p>
                </div>
                
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">🏥 Médical</h3>
                  <p className="text-white/80 text-sm">Base de données médicale complète</p>
                </div>
                
                <div className="bg-orange-500/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">⚡ Rapide</h3>
                  <p className="text-white/80 text-sm">Réponses instantanées</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-white/60">
            💤 Vous pouvez dormir tranquille ! Votre application est déployée.
          </p>
        </div>
      </div>
    </div>
  );
}
