(function(){
  var search=document.getElementById('blog-search');
  if(!search) return;
  var empty=document.getElementById('blog-empty');
  var items=Array.prototype.slice.call(document.querySelectorAll('.post-item'));
  var months=Array.prototype.slice.call(document.querySelectorAll('[data-month]'));
  var tagButtons=Array.prototype.slice.call(document.querySelectorAll('.tag-btn'));
  var activeTag=null;
  function norm(s){return (s||'').toLowerCase().replace(/ё/g,'е');}
  function refresh(){
    var q=norm(search.value.trim());
    var any=false;
    items.forEach(function(it){
      var title=norm(it.getAttribute('data-title'));
      var tags=norm(it.getAttribute('data-tags'));
      var okTag=!activeTag||tags.split('|').indexOf(norm(activeTag))!==-1;
      var okQ=!q||title.indexOf(q)!==-1||tags.indexOf(q)!==-1;
      var vis=okTag&&okQ; it.hidden=!vis; if(vis)any=true;
    });
    months.forEach(function(m){m.hidden=m.querySelectorAll('.post-item:not([hidden])').length===0;});
    empty.hidden=any;
  }
  search.addEventListener('input',refresh);
  tagButtons.forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.getAttribute('data-tag');
      activeTag=(activeTag===t)?null:t;
      tagButtons.forEach(function(x){x.classList.toggle('active',x.getAttribute('data-tag')===activeTag);});
      refresh();
    });
  });
})();
